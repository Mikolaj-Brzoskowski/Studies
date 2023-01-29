from mpl_toolkits.mplot3d import Axes3D
import matplotlib.pyplot as plt
import numpy as np
from skimage.io import imread
from skimage import color

imRGB = imread('C:/Users/pikus/Documents/Studia/Image Processing/knight.jpg')
plt.imshow(imRGB)
plt.show()
# convert from RGB to LAB color space
imLAB = color.rgb2lab(imRGB)
# set a and b color channels to zero
imLAB[...,1] = imLAB[...,2] = 0
# convert the image back to RGB color space
imRGBgray = color.lab2rgb(imLAB)
# display the color and  grayscale images
plt.figure(figsize=(20,10))
plt.subplot(121), plt.imshow(imRGB), plt.axis('off')
plt.title('original', size = 20)
plt.subplot(122)
plt.imshow(imRGBgray)
plt.axis('off')
plt.title('grayscale', size = 20)
plt.show()
plt.imsave('C:/Users/pikus/Documents/Studia/Image Processing/knight_gray.jpg', imRGBgray) 
imLAB[...,0] = imLAB[...,0] - 75
imRGBLAB = color.lab2rgb(imLAB)
plt.imshow(imRGBLAB)
plt.show()
imLAB[...,0] = imLAB[...,0] + 150
imRGBLAB = color.lab2rgb(imLAB)
plt.imshow(imRGBLAB)
plt.show()

# take a look at the values of the grayscale image
print(imRGBgray)
# display its maximum and minimum values
print(np.max(imRGBgray))
print(np.min(imRGBgray))
# set the threshold to o.3: set all the values < 0.3 to 0 (=black) and all the values >= 0.3 to 1 (=white)
imRGBgray[imRGBgray > 0.3] = 1
imRGBgray[imRGBgray <= 0.3] = 0
# take a look at the values of the binary image
print(imRGBgray)
# display the binary image
plt.imshow(imRGBgray)
plt.show()

imRGBgray = color.lab2rgb(imLAB)
imRGBgray[imRGBgray > 0.1] = 1
imRGBgray[imRGBgray <= 0.1] = 0
plt.imshow(imRGBgray)
plt.show()

imRGBgray = color.lab2rgb(imLAB)
imRGBgray[imRGBgray > 0.5] = 1
imRGBgray[imRGBgray <= 0.5] = 0
plt.imshow(imRGBgray)
plt.show()

imRGBgray = color.lab2rgb(imLAB)
imRGBgray[imRGBgray > 0.9] = 1
imRGBgray[imRGBgray <= 0.9] = 0
plt.imshow(imRGBgray)
plt.show()

imLAB[...,0] = np.max(imLAB[...,0]) - imLAB[...,0]
plt.imshow(imLAB)
plt.show()
imRGBinverted = 255 - imRGB
plt.imshow(imRGBinverted)
plt.show()