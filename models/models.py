import torch.nn as nn
import torch.nn.functional as F


class ImageLearnerThreeLayer(nn.Module):
    def __init__(self,
                 widths=(4, 6, 4)
                 ):
        super(ImageLearnerThreeLayer, self).__init__()

        self.layer1 = nn.Linear(2, widths[0])
        self.layer2 = nn.Linear(widths[0], widths[1])
        self.layer3 = nn.Linear(widths[1], widths[2])

        self.prediction = nn.Linear(widths[-1], 2)

    def forward(self, x):
        activations = []
        out = self.layer1(x)
        out = F.relu(out)
        activations.append(out)
        out = self.layer2(out)
        out = F.relu(out)
        activations.append(out)
        out = self.layer3(out)
        out = F.relu(out)
        activations.append(out)

        out = self.prediction(out)
        return out, activations


def ImageLearner(widths=(16, 16, 16)):
    return ImageLearnerThreeLayer(widths=widths)
