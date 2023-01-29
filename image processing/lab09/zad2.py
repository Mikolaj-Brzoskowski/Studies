import numpy as np
import matplotlib.pyplot as plt
from scipy import ndimage as ndi
# 1. create 2D sinewave image
N = 64
freq = 4
x = np.linspace(-np.pi,np.pi, N)
sine1D = N/2 + ((N/2-1) * np.sin(x * freq))
sine1D = np.uint8(sine1D)
sine2D = np.tile(sine1D, (N,1))
# 2. apply Affine transformation to rotate an image
w,h = sine2D.shape
angle = np.pi/2
rT=np.array([[1,0,w/2],[0,1,h/2],[0,0,1]])@np.array([[np.cos(angle),
np.sin(angle),0],[np.sin(angle),-np.cos(angle),0],[0,0,1]]) @ np.array([[1,0,-
w/2],[0,1,-h/2],[0,0,1]])
sine2D = ndi.affine_transform(sine2D, rT, mode='wrap')
# 3. compute the magnitude spectrum of an image
sine2D_fft = np.fft.fft2(sine2D)
sine2D_fft_shift = np.fft.fftshift(sine2D_fft)
sine2D_mag = np.abs(sine2D_fft_shift)
# 4. plot the image and its magnitude spectrum
fig, ax = plt.subplots(nrows=1, ncols=2, figsize=(10, 4))
ax[0].imshow(sine2D, cmap='gray',interpolation='bicubic')
ax[0].set_title('2D Sinewave Image')
ax[1].imshow(sine2D_mag, cmap='gray')
ax[1].set_title('FFT Magnitude (shifted)')
plt.show()

# 1. create 2D sinewave image
N = 64
freq = 8
x = np.linspace(-np.pi,np.pi, N)
sine1D = N/2 + ((N/2-1) * np.sin(x * freq))
sine1D = np.uint8(sine1D)
sine2D = np.tile(sine1D, (N,1))
# 2. apply Affine transformation to rotate an image
w,h = sine2D.shape
angle = np.pi/2
rT=np.array([[1,0,w/2],[0,1,h/2],[0,0,1]])@np.array([[np.cos(angle),
np.sin(angle),0],[np.sin(angle),-np.cos(angle),0],[0,0,1]]) @ np.array([[1,0,-
w/2],[0,1,-h/2],[0,0,1]])
sine2D = ndi.affine_transform(sine2D, rT, mode='wrap')
# 3. compute the magnitude spectrum of an image
sine2D_fft = np.fft.fft2(sine2D)
sine2D_fft_shift = np.fft.fftshift(sine2D_fft)
sine2D_mag = np.abs(sine2D_fft_shift)
# 4. plot the image and its magnitude spectrum
fig, ax = plt.subplots(nrows=1, ncols=2, figsize=(10, 4))
ax[0].imshow(sine2D, cmap='gray',interpolation='bicubic')
ax[0].set_title('2D Sinewave Image')
ax[1].imshow(sine2D_mag, cmap='gray')
ax[1].set_title('FFT Magnitude (shifted)')
plt.show()

# 1. create 2D sinewave image
N = 64
freq = 16
x = np.linspace(-np.pi,np.pi, N)
sine1D = N/2 + ((N/2-1) * np.sin(x * freq))
sine1D = np.uint8(sine1D)
sine2D = np.tile(sine1D, (N,1))
# 2. apply Affine transformation to rotate an image
w,h = sine2D.shape
angle = np.pi/2
rT=np.array([[1,0,w/2],[0,1,h/2],[0,0,1]])@np.array([[np.cos(angle),
np.sin(angle),0],[np.sin(angle),-np.cos(angle),0],[0,0,1]]) @ np.array([[1,0,-
w/2],[0,1,-h/2],[0,0,1]])
sine2D = ndi.affine_transform(sine2D, rT, mode='wrap')
# 3. compute the magnitude spectrum of an image
sine2D_fft = np.fft.fft2(sine2D)
sine2D_fft_shift = np.fft.fftshift(sine2D_fft)
sine2D_mag = np.abs(sine2D_fft_shift)
# 4. plot the image and its magnitude spectrum
fig, ax = plt.subplots(nrows=1, ncols=2, figsize=(10, 4))
ax[0].imshow(sine2D, cmap='gray',interpolation='bicubic')
ax[0].set_title('2D Sinewave Image')
ax[1].imshow(sine2D_mag, cmap='gray')
ax[1].set_title('FFT Magnitude (shifted)')
plt.show()

# 1. create 2D sinewave image
N = 64
freq = 4
x = np.linspace(-np.pi,np.pi, N)
sine1D = N/2 + ((N/2-1) * np.sin(x * freq))
sine1D = np.uint8(sine1D)
sine2D = np.tile(sine1D, (N,1))
# 2. apply Affine transformation to rotate an image
w,h = sine2D.shape
angle = 0
rT=np.array([[1,0,w/2],[0,1,h/2],[0,0,1]])@np.array([[np.cos(angle),
np.sin(angle),0],[np.sin(angle),-np.cos(angle),0],[0,0,1]]) @ np.array([[1,0,-
w/2],[0,1,-h/2],[0,0,1]])
sine2D = ndi.affine_transform(sine2D, rT, mode='wrap')
# 3. compute the magnitude spectrum of an image
sine2D_fft = np.fft.fft2(sine2D)
sine2D_fft_shift = np.fft.fftshift(sine2D_fft)
sine2D_mag = np.abs(sine2D_fft_shift)
# 4. plot the image and its magnitude spectrum
fig, ax = plt.subplots(nrows=1, ncols=2, figsize=(10, 4))
ax[0].imshow(sine2D, cmap='gray',interpolation='bicubic')
ax[0].set_title('2D Sinewave Image')
ax[1].imshow(sine2D_mag, cmap='gray')
ax[1].set_title('FFT Magnitude (shifted)')
plt.show()

# 1. create 2D sinewave image
N = 64
freq = 4
x = np.linspace(-np.pi,np.pi, N)
sine1D = N/2 + ((N/2-1) * np.sin(x * freq))
sine1D = np.uint8(sine1D)
sine2D = np.tile(sine1D, (N,1))
# 2. apply Affine transformation to rotate an image
w,h = sine2D.shape
angle = np.pi/4
rT=np.array([[1,0,w/2],[0,1,h/2],[0,0,1]])@np.array([[np.cos(angle),
np.sin(angle),0],[np.sin(angle),-np.cos(angle),0],[0,0,1]]) @ np.array([[1,0,-
w/2],[0,1,-h/2],[0,0,1]])
sine2D = ndi.affine_transform(sine2D, rT, mode='wrap')
# 3. compute the magnitude spectrum of an image
sine2D_fft = np.fft.fft2(sine2D)
sine2D_fft_shift = np.fft.fftshift(sine2D_fft)
sine2D_mag = np.abs(sine2D_fft_shift)
# 4. plot the image and its magnitude spectrum
fig, ax = plt.subplots(nrows=1, ncols=2, figsize=(10, 4))
ax[0].imshow(sine2D, cmap='gray',interpolation='bicubic')
ax[0].set_title('2D Sinewave Image')
ax[1].imshow(sine2D_mag, cmap='gray')
ax[1].set_title('FFT Magnitude (shifted)')
plt.show()

# 1. create 2D sinewave image
N = 64
freq = 4
x = np.linspace(-np.pi,np.pi, N)
sine1D = N/2 + ((N/2-1) * np.sin(x * freq))
sine1D = np.uint8(sine1D)
sine2D = np.tile(sine1D, (N,1))
# 2. apply Affine transformation to rotate an image
w,h = sine2D.shape
angle = np.pi/2
rT=np.array([[1,0,w/2],[0,1,h/2],[0,0,1]])@np.array([[np.cos(angle),
np.sin(angle),0],[np.sin(angle),-np.cos(angle),0],[0,0,1]]) @ np.array([[1,0,-
w/2],[0,1,-h/2],[0,0,1]])
sine2D = ndi.affine_transform(sine2D, rT, mode='wrap')
# 3. compute the magnitude spectrum of an image
sine2D_fft = np.fft.fft2(sine2D)
sine2D_fft_shift = np.fft.fftshift(sine2D_fft)
sine2D_mag = np.abs(sine2D_fft)
# 4. plot the image and its magnitude spectrum
fig, ax = plt.subplots(nrows=1, ncols=2, figsize=(10, 4))
ax[0].imshow(sine2D, cmap='gray',interpolation='bicubic')
ax[0].set_title('2D Sinewave Image')
ax[1].imshow(sine2D_mag, cmap='gray')
ax[1].set_title('FFT Magnitude (shifted)')
plt.show()