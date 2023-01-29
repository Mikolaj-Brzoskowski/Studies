from mpl_toolkits.mplot3d import Axes3D
import matplotlib.pyplot as plt
import numpy as np
from skimage.io import imread
from skimage import color
from skimage import data
from skimage.util import crop

camera = data.camera()
im = data.astronaut()

im2 = np.zeros((512, 512, 3))
im2[100:400, 100:400] = 0.5
im2[200:300, 200:300] = 1

imLAB = color.rgb2lab(im)
imLAB[...,1] = imLAB[...,2] = 0
imRGBgray = color.lab2rgb(imLAB)

imAdd = imRGBgray + im2

plt.imshow(imAdd)
plt.show()

imAdd = (1/(imAdd.max()-imAdd.min()))*(imAdd-imAdd.min())

plt.imshow(imAdd)
plt.show()
