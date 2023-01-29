from mpl_toolkits.mplot3d import Axes3D
import matplotlib.pyplot as plt
import numpy as np
from skimage.io import imread
from skimage.io import imsave
from skimage import color

imRGB = imread('E:\Mikolaj\Documents\Projekty\Image Processing\lab02\knight.jpg')
plt.imshow(imRGB)
plt.show()
imLAB = color.rgb2lab(imRGB)
imLAB[...,1] = imLAB[...,2] = 0
imRGBgray = color.lab2rgb(imLAB)
plt.figure(figsize=(20,10))
plt.subplot(121), plt.imshow(imRGB), plt.axis('off'),plt.title('original', size = 20)
plt.subplot(122), plt.imshow(imRGBgray), plt.axis('off'),plt.title('grayscale', size = 20)
plt.show()
imsave('E:\Mikolaj\Documents\Projekty\Image Processing\lab02\knight_gray.jpg', imRGBgray) 