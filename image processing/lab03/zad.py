from mpl_toolkits.mplot3d import Axes3D
import matplotlib.pyplot as plt
import numpy as np
from skimage.io import imread
from skimage import color
from skimage import data
from skimage.util import crop

# open an image e.g.,
im = data.astronaut()
# # get the number of rows and columns
# lx, ly, _ = im.shape
# # prepare a 2D meshgrid
# X, Y = np.ogrid[0:lx, 0:ly]
# # prepare a circular mask
# mask = (X-lx/2)**2 + (Y-ly/2)** 2 > lx*ly/4
# # display the mask
# plt.imshow(mask, cmap='gray')
# # apply the maskto the image
# im[mask] = [255,255,255]
# plt.imshow(mask, cmap='gray')
# # plot the resultant image
# plt.figure(figsize=(10,10))
# plt.grid(which='both',axis='both',color='w',linestyle='--',linewidth=1)
# plt.imshow(im)
# plt.show()

# orange = im[320, 160]
# blue = im[360, 170]

# circle = (X-250)**2 + (Y-450)** 2 < 100*100/4
# im[circle] = blue
# square = np.ogrid[100:200, 300:400]
# im[square] = orange
# plt.figure(figsize=(10,10))
# plt.grid(which='both',axis='both',color='w',linestyle='--',linewidth=1)
# plt.imshow(im)
# plt.show()

# im = data.astronaut()
# imCropped = im[75:125,175:275]
# plt.figure(figsize=(10,10))
# plt.grid(which='both',axis='both',color='w',linestyle='--',linewidth=1)
# plt.imshow(imCropped)
# plt.show()

# cropped = crop(im, ((75, 387), (175, 237), (0,0)) )
# plt.figure(figsize=(10,10))
# plt.grid(which='both',axis='both',color='w',linestyle='--',linewidth=1)
# plt.imshow(cropped)
# plt.show()

fliplr = np.fliplr(im)
plt.figure(figsize=(10,10))
plt.grid(which='both',axis='both',color='w',linestyle='--',linewidth=1)
plt.imshow(fliplr)
plt.show()

flipud = np.flipud(im)
plt.figure(figsize=(10,10))
plt.grid(which='both',axis='both',color='w',linestyle='--',linewidth=1)
plt.imshow(flipud)
plt.show()

from mpl_toolkits.mplot3d import Axes3D
import matplotlib.pyplot as plt
import numpy as np
from skimage.io import imread
from skimage import color
from skimage import data

# open an image e.g.,
astronaut = data.astronaut()
camera = data.camera()
plt.imshow(camera, cmap='gray')
plt.show()
bin_cam = np.where(camera>128, 255, 0)
bool_cam = bin_cam.astype(bool)
# # prepare a circularmask
# display the maskplt.imshow(mask, cmap='gray')
# apply the maskto the image
astronaut[bool_cam] = [0,0,0]
plt.imshow(bool_cam, cmap='gray')
# # plot the resultant image
plt.figure(figsize=(10,10))
plt.grid(which='both',axis='both',color='w',linestyle='--',linewidth=1)
plt.imshow(astronaut)
plt.show()