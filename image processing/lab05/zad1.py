from scipy import ndimage as ndi
from skimage import data
import numpy as np
import matplotlib.pyplot as plt
from skimage.transform import swirl

im = data.camera()
tr = np.array([[1,0,-100],[0,1,-50],[0,0,1]])
imTr = ndi.affine_transform(im, tr)

shT = np.array([[2,0,0],[0,4,0],[0,0,1]])
imshT = ndi.affine_transform(im, shT, mode='wrap')

plt.imshow(imshT, cmap='gray')
plt.show()

angle = np.deg2rad(30)

rotation_matrix = np.array(
        [
            [np.cos(angle), -np.sin(angle), 0], 
            [np.sin(angle),  np.cos(angle), 0], 
            [0,                       0,                      1]
        ])

rotT = ndi.affine_transform(imshT, rotation_matrix, mode='wrap')

plt.imshow(rotT, cmap='gray')
plt.show()

shT = np.array([[1,0.25,0],[0.25,1,0],[0,0,1]])
rotShT = ndi.affine_transform(rotT, rotation_matrix, mode='wrap')

plt.imshow(rotShT, cmap='gray')
plt.show()


swirled = swirl(im, rotation=0, strength=50, radius=360)

plt.imshow(swirled, cmap='gray')
plt.show()