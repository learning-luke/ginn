import numpy as np
import tqdm
import torch
import torch.nn as nn
import torch.optim as optim
import torch.backends.cudnn as cudnn
import torch.nn.functional as F
from models.models import ImageLearner
from utils.storage import save
import scipy.misc
import scipy

def get_statistics(activations, outputs):
    # This basically computes the activation decision boundaries
    statistics = {}
    probabilities = F.softmax(outputs, dim=1)[:, 1]
    probabilities = np.reshape(probabilities.detach().cpu().numpy(), newshape=resize_shape)
    statistics['probabilities'] = probabilities

    for i, act in enumerate(activations):
        activations[i] = np.reshape(act.detach().cpu().numpy(), newshape=resize_shape + act.shape[1:])
    activations = np.stack(activations)

    activations = (activations > 0).astype(int)
    # This is actually just a neat way of figuring out whether the ReLU switches off or on
    activation_gradients = np.gradient(activations, axis=(1, 2))

    activation_gradients = (
                ((activation_gradients[0] != 0).astype(int) +
                 (activation_gradients[1] != 0).astype(int)) != 0).astype(int)

    statistics['lines'] = np.nonzero(activation_gradients)

    return statistics

# Some default parameters to mess about with
full_batch = False  # switch on/off full batch training
device = 'cuda' if torch.cuda.is_available() else 'cpu' # totally suggest just running this on CPU anyways
print('Running on {}'.format(device))
batch_size = 128
max_iterations = 1280000
percentage_test = 0
resize_shape = (200, 200)
# tracking for saving things to port to the web application
losses = []
learning_rates = []
iterations = []
probabilities = []
lines = []
sample_at = np.concatenate([np.arange(0, 50, 1),
                            np.arange(50, 101, 2),
                            np.arange(105, 200, 2),
                            np.arange(200, 300, 5),
                            np.arange(300, 500, 10),
                            np.arange(500, 1000, 20),
                            np.arange(1000, 2000, 50),
                            np.arange(2000, 4000, 100),
                            np.arange(4000, 10000, 500),
                            np.arange(10000, max_iterations // 2, 5000),
                            np.arange(max_iterations // 2, max_iterations, 10000)])


# housekeeping
image = (scipy.misc.imread('ginn/images/gin.png', flatten=True)).astype(int)
image = scipy.misc.imresize(image, size=resize_shape) // 255
seed = 999
np.random.seed(seed)
torch.manual_seed(seed)
test_samples = np.random.choice(image.shape[0] * image.shape[0], int(image.shape[0] * image.shape[0] * percentage_test))
train_samples = np.setdiff1d(np.arange(image.shape[0] * image.shape[0]), test_samples)

# Create and initialise the network
net = ImageLearner()
net = net.to(device)
if device == 'cuda':
    net = torch.nn.DataParallel(net)
    cudnn.benchmark = True

criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(net.parameters())
scheduler = optim.lr_scheduler.CosineAnnealingLR(optimizer=optimizer, T_max=max_iterations, eta_min=0)

# Set-up for the full batch of data
all_inputs = np.empty(shape=(resize_shape[0] * resize_shape[1], 2))
all_targets = np.empty(shape=(resize_shape[0] * resize_shape[1]))
i = 0
for ri in range(resize_shape[0]):
    for ci in range(resize_shape[1]):
        all_inputs[i, 0] = ri / resize_shape[0]
        all_inputs[i, 1] = ci / resize_shape[1]
        all_targets[i] = image[ri, ci]
        i += 1


def train():

    with tqdm.tqdm(initial=0, total=max_iterations) as train_bar:
        all_losses = []
        for iter in range(max_iterations + 1):

            scheduler.step(iter)

            if full_batch:
                in_x, in_y = all_inputs[:,0], all_inputs[:,1]
                in_x = (in_x * image.shape[0]).astype(int)
                in_y = (in_y * image.shape[0]).astype(int)
            else:
                in_ = np.random.choice(train_samples, size=batch_size)
                in_x, in_y = np.unravel_index(in_, dims=image.shape)

            targets = image[in_x, in_y]
            batch = np.concatenate([np.array([in_x / image.shape[0]]).transpose(),
                                    np.array([in_y / image.shape[1]]).transpose()], axis=1)
            inputs = torch.from_numpy(batch).float()
            targets = torch.from_numpy(targets).long()
            if device == 'cuda':
                inputs = inputs.cuda()
                targets = targets.cuda()

            optimizer.zero_grad()
            outputs, activations = net(inputs)

            loss = criterion(outputs, targets)

            # This is just for smoother loss printing
            if len(all_losses) < 1000:
                all_losses.append(loss.item())
            else:
                all_losses.pop(0)
                all_losses.append(loss.item())

            loss.backward()
            optimizer.step()

            train_bar.set_description('Step {}/{}; sum loss: {:0.5f}'.format(iter, max_iterations, np.mean(all_losses)))
            train_bar.update()

            if iter in sample_at:
                all_outputs, all_activations = net(torch.from_numpy(all_inputs).float())
                all_loss = criterion(all_outputs, torch.from_numpy(all_targets).long())
                stats = get_statistics(all_activations, all_outputs)
                probabilities.append(stats['probabilities'])
                lines.append(stats['lines'])
                losses.append(all_loss.item())
                learning_rates.append(optimizer.param_groups[0]['lr'])
                iterations.append(iter)

train()
print('Finished training, housekeeping to port to the web application')
# Housekeeping
save(sample_at, probabilities, lines, losses, iterations)



