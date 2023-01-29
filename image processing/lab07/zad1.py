from PIL import Image
import scipy
import matplotlib.pyplot as plt
import numpy as np
import scipy.ndimage as ndimage

image = Image.open('E:\Mikolaj\Documents\Projekty\Image Proc\lab07\couple.tiff')
guass = ndimage.gaussian_filter(image, sigma = 1)

mask = image - guass
result = image + mask

plt.figure(figsize=(15,15))
plt.gray()
plt.subplot(141), plt.imshow(image), plt.axis('off'),plt.title('original', size = 20)
plt.subplot(142), plt.imshow(guass), plt.axis('off'),plt.title('guass', size = 20)
plt.subplot(143), plt.imshow(mask), plt.axis('off'),plt.title('mask', size = 20)
plt.subplot(144), plt.imshow(result), plt.axis('off'),plt.title('result', size = 20)
plt.show()