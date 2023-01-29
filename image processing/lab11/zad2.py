from skimage.util import random_noise
import numpy as np
from skimage.util import invert
from  skimage import data
from skimage.morphology import opening, closing
import matplotlib.pyplot as plt

im = invert(data.horse())
im1 = random_noise(im, 'salt')
im2 = random_noise(im, 'pepper')
fig, ax = plt.subplots(nrows=2, ncols=2, figsize=(8, 4))
imo = opening(im1)
imc = closing(im2)
ax[0,0].imshow(im1, cmap='gray')
ax[0,0].set_title('salt',size=5)
ax[1,0].imshow(im2, cmap='gray')
ax[1,0].set_title('pepper', size=5)
ax[0,1].imshow(imo, cmap='gray')
ax[0,1].set_title('denoied',size=5)
ax[1,1].imshow(imc, cmap='gray')
ax[1,1].set_title('denoied', size=5)
plt.show()