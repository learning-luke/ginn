import numpy as np
import scipy.misc
from skimage.morphology import skeletonize

def save(sample_at, probabilities, lines, losses, iterations, save_dir='ginn/data'):
    # Okay, so this code is a bit weird, but I had to find a work around to saving data for javascript access
    # ... Bear with me...
    # This mess below constructs a javascript variable as a string to save it as a .js file
    objectName = 'dataFileFirst'
    data_string = '{0} = new Object();\n'.format(objectName)

    for sample_id, prob, line, loss, in zip(sample_at, probabilities, lines, losses):

        data_string += '{0}[{1}] = new Object();\n'.format(objectName, sample_id)

        print('Processing {} of {}'.format(sample_id, len(sample_at)))

        idxs = []
        for li in range(3):
            data_string += '{0}[{1}][{2}] =  new Object();\n'.format(objectName, sample_id, li)
            for ui in range(16):
                data_string += '{0}[{1}][{2}][{3}] =  new Object();\n'.format(objectName, sample_id, li, ui)
                data_string += '{0}[{1}][{2}][{3}][\'x\'] =  new Object();\n'.format(objectName, sample_id, li, ui)
                data_string += '{0}[{1}][{2}][{3}][\'x\'] = ['.format(objectName, sample_id, li, ui)
                indices = np.logical_and(line[0] == li, line[3] == ui)
                xis = line[1][indices]
                yis = line[2][indices]
                for xi, yi in zip(xis, yis):
                    idxs.append((xi, yi))
                tmp_img = np.zeros_like(prob)
                tmp_img[xis, yis] = 1

                skeleton = skeletonize(tmp_img).astype(int)
                xis, yis = np.nonzero(skeleton)

                for position, xi in enumerate(xis):
                    if position != len(xis) - 1:
                        data_string += '{0},'.format(xi)
                    else:
                        data_string += '{0}'.format(xi)

                data_string += ']\n'
                data_string += '{0}[{1}][{2}][{3}][\'y\'] =  new Object();\n'.format(objectName, sample_id, li, ui)
                data_string += '{0}[{1}][{2}][{3}][\'y\'] = ['.format(objectName, sample_id, li, ui)

                for position, yi in enumerate(yis):
                    if position != len(yis) - 1:
                        data_string += '{0},'.format(yi)
                    else:
                        data_string += '{0}'.format(yi)
                data_string += ']\n'

                scipy.misc.imsave('{}/p_{}.png'.format(save_dir,sample_id), (prob))

        if sample_id == 100:
            print('SAVING FIRST')
            with open('{}/data_first.js'.format(save_dir), 'w') as f:
                f.write(data_string)
            objectName = 'dataFileLast'
            data_string = '{} = new Object();\n'.format(objectName)
        if sample_id == sample_at[-1]:
            print('SAVING LAST')
            with open('{}/data_last.js'.format(save_dir), 'w') as f:
                f.write(data_string)

    # Now store the training statistics
    statString = 'trainingStats = new Object();\n'
    statString += 'trainingStats[\"losses\"] = new Object();\n'
    statString += 'trainingStats[\"losses\"] = ' + str(list(losses)) + ';'
    statString += '\n'

    statString += 'trainingStats[\"iterations\"] = new Object();\n'
    statString += 'trainingStats[\"iterations\"] = ' + str(list(sample_at)) + ';'
    statString += '\n'

    with open('{}/training_stats.js'.format(save_dir), 'w') as f:
        f.write(statString)

