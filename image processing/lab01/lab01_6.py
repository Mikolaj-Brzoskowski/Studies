from mpl_toolkits.mplot3d import Axes3D
import matplotlib.pyplot as plt
import numpy as np
from skimage.io import imread
from skimage import color

image = imread('Image Processing\smile.png', True)
image_black = imread('Image Processing\smile_black.png', True)
kula = imread('Image Processing/kula.png', True)
data_2d = [ [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0],
            [0, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0],
            [0, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0],
            [0, 0.2, 0.2, 1, 1, 1, 1, 1, 0.2, 0.2, 0],
            [0, 0.2, 0.2, 1, 1, 1, 1, 1, 0.2, 0.2, 0],
          [0, 0.2, 0.2, 1, 1, 1, 1, 1, 0.2, 0.2, 0],
          [0, 0.2, 0.2, 1, 1, 1, 1, 1, 0.2, 0.2, 0],
          [0, 0.2, 0.2, 1, 1, 1, 1, 1, 0.2, 0.2, 0],
          [0, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0],
          [0, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0],
         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0]]           
# Convert into an numpy array.
data_array = np.array(kula)
# Create a figure for plotting the data as a 3D histogram.
fig = plt.figure()
ax = fig.add_subplot(111, projection='3d')
x_data, y_data = np.meshgrid( np.arange(data_array.shape[1]), np.arange(data_array.shape[0]) )
x_data = x_data.flatten()
y_data = y_data.flatten()
z_data = data_array.flatten()
ax.bar3d( x_data, y_data,np.zeros(len(z_data)),1, 1, z_data )
# Finally, display the plot.
plt.show()