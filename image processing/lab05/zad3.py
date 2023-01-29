from scipy import ndimage as ndi
from skimage import data
import numpy as np
import matplotlib.pyplot as plt
from skimage.transform import swirl

image = data.camera()

def cov_binary(num):
    binary_num = [int(i) for i in list('{0:0b}'.format(num))]
    for j in range(8 - len(binary_num)):
        binary_num.insert(0,0)        
    return binary_num

def conv_decimal(listt):
    x = 0
    for i in range(8):
        x = x + int(listt[i])*(2**(7-i))
    return x

def discriminate_bit(bit,img):
    z = np.zeros([510,510])
    for i in range(510):
        for j in range(510):
            x = cov_binary(img[i][j])
            for k in range(8):
                if k == bit:
                    x[k] = x[k]
                else:
                    x[k] = 0
            x1 = conv_decimal(x)
            z[i][j] = x1
    return z

fig = plt.figure()
fig.set_figheight(15)
fig.set_figwidth(15)

for i in range(1,9):
    fig.add_subplot(4,2,i)
    match i:
        case 1:
            im_1 = discriminate_bit(i-1,image)
        case 2:
            im_2 = discriminate_bit(i-1,image)
        case 3:
            im_3 = discriminate_bit(i-1,image)
        case 4:
            im_4 = discriminate_bit(i-1,image)
    plt.imshow(discriminate_bit(i-1, image), cmap='gray')
            
plt.show(block=True)

image_restored = im_1 + im_2 + im_3 + im_4
plt.imshow(image_restored, cmap='gray')
plt.show()