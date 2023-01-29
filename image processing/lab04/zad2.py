import matplotlib.pyplot as plt
import numpy as np
from skimage.io import imread
from skimage import color
from skimage import data
from skimage.util import crop

image1 = imread('E:\Mikolaj\Documents\Projekty\Image Proc\lab04\motion01.tiff', as_gray=True)

image2 = imread('E:\Mikolaj\Documents\Projekty\Image Proc\lab04\motion05.tiff', as_gray=True)


plt.imshow(image1)
plt.show()


imSub = image2 / image1

imSub[imSub<0] = 0

plt.imshow(imSub,cmap='gray')
plt.show()

im = data.astronaut()

im2 = np.zeros((512, 512, 3))
im2[100:400, 100:400] = 0.5
im2[200:300, 200:300] = 1

imLAB = color.rgb2lab(im)
imLAB[...,1] = imLAB[...,2] = 0
imRGBgray = color.lab2rgb(imLAB)

imMult = imRGBgray * im2

plt.imshow(imMult)
plt.show()