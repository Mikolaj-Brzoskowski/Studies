from mpl_toolkits.mplot3d import Axes3D
import matplotlib.pyplot as plt
import numpy as np
from skimage.io import imread
from skimage import color
from  scipy import signal
from skimage import data
from skimage import filters
from scipy import ndimage

im = imread('E:\Mikolaj\Documents\Projekty\Image Proc\lab06\The-original-cameraman-image.png')
im_Gaus = filters.gaussian(im, sigma = 5, mode = 'constant')
plt.imshow(im_Gaus, cmap='gray')
plt.show()

im_Gaus = filters.gaussian(im, sigma = 50, mode = 'constant')
plt.imshow(im_Gaus, cmap='gray')
plt.show()

im_Gaus = filters.gaussian(im, sigma = 100, mode = 'constant')
plt.imshow(im_Gaus, cmap='gray')
plt.show()

im_Gaus_1 = filters.gaussian(im, sigma = 50, mode = 'constant')
im_Gaus_2 = filters.gaussian(im, sigma = 50, mode = 'mirror')
plt.figure(figsize=(10,10))
plt.subplot(121), plt.imshow(im_Gaus_1, cmap='gray'), plt.axis('off'),plt.title('constant', size = 20)
plt.subplot(122), plt.imshow(im_Gaus_2, cmap='gray'), plt.axis('off'),plt.title('mirror', size = 20)
plt.show()

im = imread('E:\Mikolaj\Documents\Projekty\Image Proc\lab06\im1GRAY.jpg')

im_star = ndimage.minimum_filter(im, size=(10,10))
im_star_2 = ndimage.maximum_filter(im, size=(10,10))
plt.figure(figsize=(10,10))
plt.subplot(131), plt.imshow(im, cmap='gray'), plt.axis('off'),plt.title('original', size = 20)
plt.subplot(132), plt.imshow(im_star, cmap='gray'), plt.axis('off'),plt.title('minimum', size = 20)
plt.subplot(133), plt.imshow(im_star_2, cmap='gray'), plt.axis('off'),plt.title('maximum', size = 20)
plt.show()