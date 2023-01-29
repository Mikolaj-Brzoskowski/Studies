import numpy as np
import matplotlib.pyplot as plt
from skimage.io import imread
from skimage import color
from PIL import Image
from skimage.exposure import exposure
from skimage import data
import skimage

def rgb2gray(rgb):
    return np.dot(rgb[...,:3], [0.2989, 0.5870, 0.1140])

image = rgb2gray(imread('E:\Mikolaj\Documents\Projekty\Image Proc\lab06\house.tiff'))

# histogram,bin_edges=np.histogram(image,bins=256,range=(0,255),density=False)
# plt.figure()
# plt.subplot(121)
# plt.bar(bin_edges[:-1], histogram, width=3,color='blue') 
# plt.axis('on')
# plt.title("Grayscale   Histogram")
# plt.xlabel("grayscale value")
# plt.ylabel("pixels")
# plt.xlim([0.0, 256.0])
# plt.subplot(122)
# plt.imshow(image, cmap='gray')
# plt.axis('off')
# plt.show()

# histogram,bin_edges=np.histogram(image,bins=256,range=(0,255),density=True)
# plt.figure()
# plt.subplot(121)
# plt.bar(bin_edges[:-1], histogram, width=3,color='blue') 
# plt.axis('on')
# plt.title("Grayscale   Histogram")
# plt.xlabel("grayscale value")
# plt.ylabel("pixels")
# plt.xlim([0.0, 256.0])
# plt.subplot(122)
# plt.imshow(image, cmap='gray')
# plt.axis('off')
# plt.show()

# image = rgb2gray(imread('E:\Mikolaj\Documents\Projekty\Image Proc\lab06\CameraBright.jpg'))
# histogram,bin_edges=np.histogram(image,bins=256,range=(0,255),density=False)
# plt.figure()
# plt.subplot(121)
# plt.bar(bin_edges[:-1], histogram, width=3,color='blue') 
# plt.axis('on')
# plt.title("Grayscale   Histogram")
# plt.xlabel("grayscale value")
# plt.ylabel("pixels")
# plt.xlim([0.0, 256.0])
# plt.subplot(122)
# plt.imshow(image, cmap='gray')
# plt.axis('off')
# plt.show()

# image = rgb2gray(imread('E:\Mikolaj\Documents\Projekty\Image Proc\lab06\CameraDark.jpg'))
# histogram,bin_edges=np.histogram(image,bins=256,range=(0,255),density=False)
# plt.figure()
# plt.subplot(121)
# plt.bar(bin_edges[:-1], histogram, width=3,color='blue') 
# plt.axis('on')
# plt.title("Grayscale   Histogram")
# plt.xlabel("grayscale value")
# plt.ylabel("pixels")
# plt.xlim([0.0, 256.0])
# plt.subplot(122)
# plt.imshow(image, cmap='gray')
# plt.axis('off')
# plt.show()

# im = Image.open('E:\Mikolaj\Documents\Projekty\Image Proc\lab06\house.tiff')
# imRed, imGreen, imBlue = im.split()
# plt.hist(np.array(imRed).ravel(), bins=256, range=(0, 256), color='r', alpha=0.5)
# plt.show()
# plt.hist(np.array(imGreen).ravel(), bins=256, range=(0, 256), color='g', alpha=0.5)
# plt.show()
# plt.hist(np.array(imBlue).ravel(), bins=256, range=(0, 256), color='b', alpha=0.5)
# plt.show()

# histogram,bin_edges=np.histogram(image,bins=256,range=(0,255),density=False)
# plt.figure()
# plt.subplot(121)
# plt.bar(bin_edges[:-1], histogram, width=3,color='blue') 
# plt.axis('on')
# plt.title("Grayscale   Histogram")
# plt.xlabel("grayscale value")
# plt.ylabel("pixels")
# plt.xlim([0.0, 256.0])
# plt.subplot(122)
# plt.imshow(image, cmap='gray')
# plt.axis('off')
# plt.show()

# im_eq = exposure.equalize_hist(image)

# histogram,bin_edges=np.histogram(im_eq,bins=256,range=(0,255),density=True)
# plt.figure()
# plt.subplot(121)
# plt.bar(bin_edges[:-1], histogram, width=3,color='blue') 
# plt.axis('on')
# plt.title("Grayscale   Histogram")
# plt.xlabel("grayscale value")
# plt.ylabel("pixels")
# plt.xlim([0.0, 256.0])
# plt.subplot(122)
# plt.imshow(im_eq, cmap='gray')
# plt.axis('off')
# plt.show()

image = data.chelsea()

reference = imread('E:\Mikolaj\Documents\Projekty\Image Proc\lab06\house.tiff')

matched = skimage.exposure.match_histograms(image, reference, multichannel=True)

plt.figure(figsize=(10,10))
plt.subplot(131), plt.imshow(image), plt.axis('off'),plt.title('Source', size = 20)
plt.subplot(132), plt.imshow(reference), plt.axis('off'),plt.title('Reference', size = 20)
plt.subplot(133), plt.imshow(matched), plt.axis('off'),plt.title('Matched', size = 20)
plt.show()