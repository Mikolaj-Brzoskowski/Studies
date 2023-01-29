import matplotlib.pyplot as plt
from skimage.io import imread
import numpy as np
from scipy import ndimage as ndi
from skimage import data
from PIL import Image, ImageDraw

im = imread("E:\Mikolaj\Documents\Projekty\Image Proc\lab09\clock.tiff")
# 1. compute FFT of the image
fft1 = np.fft.fftshift(np.fft.fft2(im))
im_mag = 20*np.log(np.abs(fft1)+1)
# 2. create a low-pass filter image
x,y = im.shape[0],im.shape[1]
# distance from the filter boarder to the image boarder
x2boarder,y2boarder = 50,50
# create a box
box=((x/2)-(x2boarder/2),(y/2)-(y2boarder/2),(x/2)+(x2boarder/2),(y/2)+(y2boarder/2))
# draw a circle
low_pass=Image.new("L",(im.shape[0],im.shape[1]),color=0)
draw=ImageDraw.Draw(low_pass)
draw.ellipse(box, fill=1)
low_pass = np.array(low_pass)
# multiply the image with the filter
filtered = np.multiply(fft1,low_pass)
im_mag_fil = 20*np.log(np.abs(filtered)+1)
# 3. compute inverse FFT
ifft2 = np.real(np.fft.ifft2(np.fft.fftshift(filtered)))
# range from 0 to 255
ifft2 = np.maximum(0, np.minimum(ifft2, 255))
# 4. plot the original & filtered image, their spectrum magnitudes, &
# the low-pass filter
fig, ax = plt.subplots(nrows=2, ncols=3, figsize=(16, 11.5))
ax[0,0].imshow(im, cmap='gray')
ax[0,0].set_title('Original Image', size=20)
ax[0,1].imshow(im_mag, cmap='gray')
ax[0,1].set_title('Magnitude Spectrum of \n the Original Image (log)', size=20)
ax[0,2].imshow(low_pass, cmap='gray')
ax[0,2].set_title("Low-Pass Filter", size=20)
ax[1,0].imshow(ifft2, cmap='gray')
ax[1,0].set_title("Low-Pass Filtered Image", size=20)
ax[1,1].imshow(im_mag_fil, cmap='gray')
ax[1,1].set_title("Magnitude Spectrum \n of the Filtered Image (log)", size=20)
plt.axis('off')
plt.show()

im = imread("E:\Mikolaj\Documents\Projekty\Image Proc\lab09\clock.tiff")
# 1. compute FFT of the image
fft1 = np.fft.fftshift(np.fft.fft2(im))
im_mag = 20*np.log(np.abs(fft1)+1)
# 2. create a low-pass filter image
x,y = im.shape[1],im.shape[0]
# distance from the filter boarder to the image boarder
x2boarder,y2boarder = 50,50
# create a box
box=((x/2)-(x2boarder/2),(y/2)-(y2boarder/2),(x/2)+(x2boarder/2),(y/2)+(y2boarder/2))
# draw a circle
low_pass=Image.new("L",(im.shape[1],im.shape[0]),color=1)
draw=ImageDraw.Draw(low_pass)
draw.ellipse(box, fill=0)
low_pass = np.array(low_pass)
# multiply the image with the filter
filtered = np.multiply(fft1,low_pass)
im_mag_fil = 20*np.log(np.abs(filtered)+1)
# 3. compute inverse FFT
ifft2 = np.real(np.fft.ifft2(np.fft.fftshift(filtered)))
# range from 0 to 255
ifft2 = np.maximum(0, np.minimum(ifft2, 255))
# 4. plot the original & filtered image, their spectrum magnitudes, &
# the low-pass filter
fig, ax = plt.subplots(nrows=2, ncols=3, figsize=(16, 11.5))
ax[0,0].imshow(im, cmap='gray')
ax[0,0].set_title('Original Image', size=20)
ax[0,1].imshow(im_mag, cmap='gray')
ax[0,1].set_title('Magnitude Spectrum of \n the Original Image (log)', size=20)
ax[0,2].imshow(low_pass, cmap='gray')
ax[0,2].set_title("High-Pass Filter", size=20)
ax[1,0].imshow(ifft2, cmap='gray')
ax[1,0].set_title("High-Pass Filtered Image", size=20)
ax[1,1].imshow(im_mag_fil, cmap='gray')
ax[1,1].set_title("Magnitude Spectrum \n of the Filtered Image (log)", size=20)
plt.axis('off')
plt.show()