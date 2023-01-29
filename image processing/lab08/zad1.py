from PIL import Image
import matplotlib.pyplot as plt
from skimage import data
from skimage.color import rgb2hsv
from skimage.color import rgb2gray
from skimage.io import imread
import PIL.ImageOps    
import numpy as np
import cv2

shapes = imread('E:\Mikolaj\Documents\Projekty\Image Proc\lab08\simple_shapes.png')

shapes_hsv = rgb2hsv(shapes)

plt.figure(figsize=(15,15))
plt.subplot(121), plt.imshow(shapes), plt.axis('off'),plt.title('original', size = 20)
plt.subplot(122), plt.imshow(shapes_hsv), plt.axis('off'),plt.title('hsv', size = 20)
plt.show()

monke = Image.open('Image Proc\lab08\monkey.tiff')

funy_monke = PIL.ImageOps.invert(monke)

plt.figure(figsize=(15,15))
plt.subplot(121), plt.imshow(monke), plt.axis('off'),plt.title('original', size = 20)
plt.subplot(122), plt.imshow(funy_monke), plt.axis('off'),plt.title('inverted', size = 20)
plt.show()

img = cv2.imread('Image Proc\lab08\couple.tiff')
row, column, _ = img.shape
img1 = img[:]

for i in range(row):
    for j in range(column):
        pixel = img[i, j] 
        if pixel[0]>=125:
            pixel[0]=31
        else:
            pixel[0] = 255
        if pixel[1]>=125:
            pixel[1] = 119
        else:
            pixel[1] = 127
        if pixel[2]>=125:
            pixel[2] = 180
        else:
            pixel[2] = 14
        img1[i, j] = pixel

img = cv2.imread('Image Proc\lab08\couple.tiff')
plt.figure(figsize=(15,15))
plt.subplot(121), plt.imshow(img), plt.axis('off'),plt.title('original', size = 20)
plt.subplot(122), plt.imshow(img1), plt.axis('off'),plt.title('sliced', size = 20)
plt.show()