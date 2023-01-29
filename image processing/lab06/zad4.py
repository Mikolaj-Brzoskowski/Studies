from mpl_toolkits.mplot3d import Axes3D
import matplotlib.pyplot as plt
import numpy as np
from skimage.io import imread
from skimage import color
from  scipy import signal
from skimage import data

im = imread('E:\Mikolaj\Documents\Projekty\Image Proc\lab06\The-original-cameraman-image.png')
kernel = np.array([[1/9, 1/9, 1/9], [1/9, 1/9, 1/9],[ 1/9, 1/9, 1/9]])
im_MEAN = signal.convolve2d(im,kernel, mode = 'full')
plt.imshow(im_MEAN, cmap='gray')
plt.show()

kernel = np.ones([7, 7], dtype = int)
kernel = kernel / 49
im = imread('E:\Mikolaj\Documents\Projekty\Image Proc\lab06\The-original-cameraman-image.png')
im_MEAN = signal.convolve2d(im,kernel, mode = 'valid')
plt.imshow(im_MEAN, cmap='gray')
plt.show()


kernel = np.ones([15, 15], dtype = int)
kernel = kernel / 225
im = imread('E:\Mikolaj\Documents\Projekty\Image Proc\lab06\The-original-cameraman-image.png')
im_MEAN = signal.convolve2d(im,kernel, mode = 'same')
plt.imshow(im_MEAN, cmap='gray')
plt.show()
