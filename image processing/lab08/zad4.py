import numpy as np
import cv2
from matplotlib import pyplot as plt
from PIL import Image, ImageFilter

image = cv2.imread('Image Proc\lab08\\boat.tiff') # reads the image
image = cv2.cvtColor(image, cv2.COLOR_BGR2HSV) # convert to HSV
figure_size = 11 # the dimension of the x and y axis of the kernal.
mean = cv2.blur(image,(figure_size, figure_size))
image2 = cv2.imread('Image Proc\lab08\\boat.tiff') # reads the image
new_image = cv2.Laplacian(image2,cv2.CV_64F)
plt.figure(figsize=(11,6))
plt.subplot(131), plt.imshow(cv2.cvtColor(image, cv2.COLOR_HSV2RGB)),plt.title('Original')
plt.xticks([]), plt.yticks([])
plt.subplot(132), plt.imshow(cv2.cvtColor(mean, cv2.COLOR_HSV2RGB)),plt.title('Mean filter')
plt.xticks([]), plt.yticks([])
plt.subplot(133), plt.imshow(new_image, cmap='gray'),plt.title('Laplacian')
plt.xticks([]), plt.yticks([])
plt.show()