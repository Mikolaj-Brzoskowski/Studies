import matplotlib.pyplot as plt
from skimage.io import imread
import scipy.ndimage.morphology as morph
from skimage.filters import threshold_otsu
import numpy as np
import matplotlib.pyplot as plt
from skimage import color
from skimage import io

im = color.rgb2gray(io.imread('lab11\lotus.png'))

dilation = morph.grey_dilation(im, size=(15,15))
erosion = morph.grey_erosion(im, size=(15,15))
op = morph.grey_opening(im, size=(15,15))

fig, ax = plt.subplots(nrows=1, ncols=4, figsize=(8, 4))
ax[0].imshow(im, cmap='gray')
ax[0].set_title('binary',size=5)
ax[1].imshow(dilation, cmap='gray')
ax[1].set_title('dilation', size=5)
ax[2].imshow(erosion, cmap='gray')
ax[2].set_title('erosion',size=5)
ax[3].imshow(op, cmap='gray')
ax[3].set_title('opening', size=5)
plt.show()