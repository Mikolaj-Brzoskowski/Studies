from PIL import Image
import matplotlib.pyplot as plt
from skimage import data
from skimage.color import rgb2hsv
from skimage.color import hsv2rgb
from skimage.io import imread
import PIL.ImageOps    
import numpy as np
import cv2
from skimage.exposure import adjust_gamma

shapes = imread('Image Proc\lab08\couple_dark.tiff')

shapes_hsv = rgb2hsv(shapes)
h, s, v = shapes_hsv[:, :, 0], shapes_hsv[:, :, 1], shapes_hsv[:, :, 2]
for i in range(0,len(v)):
    for j in range(0,len(v[i])):
        v[i, j] += 0.2
shapes_hsv[:,:,2] = v
shapes = hsv2rgb(shapes_hsv)
plt.imshow(shapes)
plt.show()


female = imread('E:\Mikolaj\Documents\Projekty\Image Proc\lab08\\femaleRED.tiff')
female_hsv = rgb2hsv(female)
plt.imshow(female_hsv)
plt.show()
adjust_gamma(female_hsv, gamma=10, gain=3)
female = hsv2rgb(female_hsv)
plt.imshow(female_hsv)
plt.show()
plt.imshow(female)
plt.show()