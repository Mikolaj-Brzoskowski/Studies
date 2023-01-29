from cv2 import bitwise_xor
import numpy as np
from skimage.morphology import binary_erosion, disk
from skimage.util import invert
from  skimage import data
import skimage.morphology as morph
import matplotlib.pyplot as plt
im = invert(data.horse())
im1 = binary_erosion(im, disk(5))
im2 = binary_erosion(im, disk(10))
imd = morph.binary_dilation(im1)
imd2 = morph.binary_dilation(im2)
fig, ax = plt.subplots(nrows=1, ncols=2, figsize=(8, 4))
ax[0].imshow(imd, cmap='gray')
ax[0].set_title('5x5',size=20)
ax[1].imshow(imd2, cmap='gray')
ax[1].set_title('10x10', size=20)
plt.show()
erosion = binary_erosion(im)
boundary = np.subtract(im, erosion, dtype=np.float32)
plt.imshow(boundary)
plt.show()