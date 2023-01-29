import matplotlib.pyplot as plt
from skimage.io import imread
import skimage.morphology as morph
from skimage.filters import threshold_otsu
import numpy as np
import matplotlib.pyplot as plt
from skimage import color
from skimage import io

im = color.rgb2gray(io.imread('lab11\giraffe.png'))
thresh = threshold_otsu(im)
binary = im > thresh

skeletons = morph.skeletonize(binary)
convex = morph.convex_hull_image(binary)
thin =  morph.thin(binary)

fig, ax = plt.subplots(nrows=1, ncols=4, figsize=(8, 4))
ax[0].imshow(im, cmap='gray')
ax[0].set_title('binary',size=5)
ax[1].imshow(skeletons, cmap='gray')
ax[1].set_title('skeleton', size=5)
ax[2].imshow(convex, cmap='gray')
ax[2].set_title('convex',size=5)
ax[3].imshow(thin, cmap='gray')
ax[3].set_title('thin', size=5)
plt.show()