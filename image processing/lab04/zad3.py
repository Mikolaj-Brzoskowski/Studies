import matplotlib.pyplot as plt
import numpy as np
from skimage.io import imread
from skimage import color
from skimage import data

im1 = imread('E:\Mikolaj\Documents\Projekty\Image Proc\lab04\im1.jpg', as_gray=True)
im2 = imread('E:\Mikolaj\Documents\Projekty\Image Proc\lab04\im2.jpg', as_gray=True)

imAND = np.logical_and(im1, im2)
imOR = np.logical_or(im1, im2)
imXOR = np.logical_xor(im1, im2)


plt.imshow(imAND, cmap='gray')
plt.show()

plt.imshow(imOR, cmap='gray')
plt.show()

plt.imshow(imXOR, cmap='gray')
plt.show()

im1 = data.astronaut()
im2 = data.camera()

im = im1[:,:,0]

imAND = np.bitwise_and(im, im2)
imOR = np.bitwise_or(im, im2)
imXOR = np.bitwise_xor(im, im2)

plt.imshow(imAND, cmap='gray')
plt.show()

plt.imshow(imOR, cmap='gray')
plt.show()

plt.imshow(imXOR, cmap='gray')
plt.show()

print(im[0,0])
print(im2[0,0])
print(imAND[0,0])