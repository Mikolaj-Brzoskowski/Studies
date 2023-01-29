import matplotlib.pyplot as plt
from skimage.io import imread
import numpy as np
from scipy import ndimage as ndi
from skimage import data
from PIL import Image

image = data.camera()

im = Image.open('E:\Mikolaj\Documents\Projekty\Image Proc\lab09\monkey.tiff').convert('L')

im_pha = np.angle(np.fft.fftshift(np.fft.fftn(im)))
im_pha_2 = np.angle(np.fft.fftshift(np.fft.fftn(image)))

im_fft = np.fft.fft2(im)
im_fft_shift = np.fft.fftshift(im_fft)
im_mag = np.log(np.abs(im_fft_shift)+1)

im_fft_2 = np.fft.fft2(image)
im_fft_shift_2 = np.fft.fftshift(im_fft)
im_mag_2 = np.log(np.abs(im_fft_shift)+1)

fig, ax = plt.subplots(nrows=2, ncols=3, figsize=(8, 4))
ax[0,0].imshow(im, cmap='gray')
ax[0,0].set_title('Image')
ax[0,1].imshow(im_mag, cmap='gray')
ax[0,1].set_title('FFT Magnitude (log)')
ax[0,2].imshow(im_pha, cmap='gray')
ax[0,2].set_title('Phase Spectrum')
ax[1,0].imshow(image, cmap='gray')
ax[1,0].set_title('Image')
ax[1,1].imshow(im_mag_2, cmap='gray')
ax[1,1].set_title('FFT Magnitude (log)')
ax[1,2].imshow(im_pha_2, cmap='gray')
ax[1,2].set_title('Phase Spectrum')
plt.show()

f1 = np.fft.fft2(image)
im1Reconstructed = np.real(np.fft.ifft2(f1))
plt.imshow(im1Reconstructed, cmap='gray')
plt.show()

f2 = np.fft.fft2(im)
im2Reconstructed = np.real(np.fft.ifft2(f2))
plt.imshow(im2Reconstructed, cmap='gray')
plt.show()

imCombined = np.multiply(np.abs(f1), np.exp(1j*np.angle(f2)))
imCombined = np.real(np.fft.ifft2(imCombined))
plt.imshow(imCombined, cmap='gray')
plt.show()

imCombined = np.multiply(np.abs(f2), np.exp(1j*np.angle(f1)))
imCombined = np.real(np.fft.ifft2(imCombined))
plt.imshow(imCombined, cmap='gray')
plt.show()