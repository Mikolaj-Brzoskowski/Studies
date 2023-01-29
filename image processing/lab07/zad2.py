from PIL import Image
import scipy
import matplotlib.pyplot as plt
import numpy as np
import scipy.signal
import scipy.ndimage as ndimage

# image = Image.open('E:\Mikolaj\Documents\Projekty\Image Proc\lab07\SandT.jpg')
# filter = np.array([[ -1, -2, -1],
#                    [ 0, 0, 0],
#                    [ 1, 2, 1]])
# sobel = scipy.signal.convolve2d(image, filter)
# filter2 = np.array([[ -1, 0, 1],
#                    [ -2, 0, 2],
#                    [ -1, 0, 1]])
# sobel2 = scipy.signal.convolve2d(image, filter2)
# sobel3 = sobel + sobel2
# plt.figure(figsize=(15,15))
# plt.gray()
# plt.subplot(131), plt.imshow(sobel), plt.axis('off'),plt.title('xaxis', size = 20)
# plt.subplot(132), plt.imshow(sobel2), plt.axis('off'),plt.title('yaxis', size = 20)
# plt.subplot(133), plt.imshow(sobel3), plt.axis('off'),plt.title('added', size = 20)
# plt.show()

# image = Image.open(r'E:\Mikolaj\Documents\Projekty\Image Proc\lab07\fishing_boat.tiff')
# filter = np.array([[ -1, -2, -1],
#                    [ 0, 0, 0],
#                    [ 1, 2, 1]])
# sobel = scipy.signal.convolve2d(image, filter)
# filter2 = np.array([[ -1, 0, 1],
#                    [ -2, 0, 2],
#                    [ -1, 0, 1]])
# sobel2 = scipy.signal.convolve2d(image, filter2)
# sobel3 = sobel + sobel2
# plt.figure(figsize=(15,15))
# plt.gray()
# plt.subplot(131), plt.imshow(sobel), plt.axis('off'),plt.title('xaxis', size = 20)
# plt.subplot(132), plt.imshow(sobel2), plt.axis('off'),plt.title('yaxis', size = 20)
# plt.subplot(133), plt.imshow(sobel3), plt.axis('off'),plt.title('added', size = 20)
# plt.show()

# image = Image.open(r'E:\Mikolaj\Documents\Projekty\Image Proc\lab07\fishing_boat.tiff')
# filter = np.array([[ 0, 1, 0],
#                    [ 1, -4, 1],
#                    [ 0, 1, 0]])
# Laplacian = scipy.signal.convolve2d(image, filter)
# plt.figure(figsize=(15,15))
# plt.gray()
# plt.subplot(111), plt.imshow(Laplacian), plt.axis('off'),plt.title('Laplacian', size = 20)
# plt.show()

image = Image.open(r'E:\Mikolaj\Documents\Projekty\Image Proc\lab07\fishing_boat.tiff')
im1 = ndimage.gaussian_laplace(image, sigma=1)
im2 = ndimage.gaussian_laplace(image, sigma=3)
plt.figure(figsize=(15,15))
plt.gray()
plt.subplot(121), plt.imshow(im1), plt.axis('off')
plt.subplot(122), plt.imshow(im2), plt.axis('off')
plt.show()