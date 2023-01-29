import matplotlib.pyplot as plt
from skimage.io import imread
import numpy as np

im = imread("E:\Mikolaj\Documents\Projekty\Image Proc\lab09\clock.tiff")
im_fft = np.fft.fft2(im)
im_fft_shift = np.fft.fftshift(im_fft)
im_mag = np.log(np.abs(im_fft_shift)+1)
fig, ax = plt.subplots(nrows=1, ncols=2, figsize=(8, 4))
ax[0].imshow(im, cmap='gray')
ax[0].set_title('Image', weight='bold')
ax[1].imshow(im_mag, cmap='gray')
ax[1].set_title('FFT Magnitude (log)', size=20)
plt.show()

im = imread("E:\Mikolaj\Documents\Projekty\Image Proc\lab09\clock_blurry.png")
im_fft = np.fft.fft2(im)
im_fft_shift = np.fft.fftshift(im_fft)
im_mag = np.log(np.abs(im_fft_shift)+1)
fig, ax = plt.subplots(nrows=1, ncols=2, figsize=(8, 4))
ax[0].imshow(im, cmap='gray')
ax[0].set_title('Image', weight='bold')
ax[1].imshow(im_mag, cmap='gray')
ax[1].set_title('FFT Magnitude (log)', size=20)
plt.show()

im = imread("E:\Mikolaj\Documents\Projekty\Image Proc\lab09\clock_sharp.png")
im_fft = np.fft.fft2(im)
im_fft_shift = np.fft.fftshift(im_fft)
im_mag = np.log(np.abs(im_fft_shift)+1)
fig, ax = plt.subplots(nrows=1, ncols=2, figsize=(8, 4))
ax[0].imshow(im, cmap='gray')
ax[0].set_title('Image', weight='bold')
ax[1].imshow(im_mag, cmap='gray')
ax[1].set_title('FFT Magnitude (log)', size=20)
plt.show()