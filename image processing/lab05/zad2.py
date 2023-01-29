from scipy import ndimage as ndi
from skimage import data
import numpy as np
import matplotlib.pyplot as plt
from skimage.transform import swirl

image = data.camera()

c = 255 / np.log(1 + np.max(image))
log_image_1 = c * (np.log(image + 1))
   
# Specify the data type so that
# float value will be converted to int

   
# Display both images
plt.imshow(image, cmap='gray')
plt.show()
plt.imshow(log_image_1, cmap='gray')
plt.show()