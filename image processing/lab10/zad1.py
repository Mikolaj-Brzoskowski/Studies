import cv2

img = cv2.imread('Image Proc\lab10\male.tiff')

watermark = cv2.imread("Image Proc\lab10\watermark.jpg")

percent_of_scaling = 50

new_width = int(img.shape[1] * percent_of_scaling/100)

new_height = int(img.shape[0] * percent_of_scaling/100)

new_dim = (new_width, new_height)

resized_img = cv2.resize(img, new_dim, interpolation=cv2.INTER_AREA)

wm_scale = 50

wm_width = int(watermark.shape[1] * wm_scale/100)

wm_height = int(watermark.shape[0] * wm_scale/100)

wm_dim = (wm_width, wm_height)

resized_wm = cv2.resize(watermark, wm_dim, interpolation=cv2.INTER_AREA)

h_img, w_img, _ = resized_img.shape

center_y = int(h_img)

center_x = int(w_img)

h_wm, w_wm, _ = resized_wm.shape

top_y = center_y - int(h_wm)

left_x = center_x - int(w_wm)

bottom_y = top_y + h_wm

right_x = left_x + w_wm

roi = resized_img[top_y:bottom_y, left_x:right_x]

result = (1 - 1) * roi + 1 * resized_wm

resized_img[top_y:bottom_y, left_x:right_x] = result

filename = 'Watermakred_Image.jpg'

cv2.imwrite("E:\Mikolaj\Documents\Projekty\Image Proc\lab10\myWatermarked1.tiff", resized_img)

cv2.imshow("Resized Input Image", resized_img)

cv2.waitKey(0)

cv2.destroyAllWindows()

# alpha = 0.3

img = cv2.imread('Image Proc\lab10\male.tiff')

watermark = cv2.imread("Image Proc\lab10\watermark.jpg")

percent_of_scaling = 50

new_width = int(img.shape[1] * percent_of_scaling/100)

new_height = int(img.shape[0] * percent_of_scaling/100)

new_dim = (new_width, new_height)

resized_img = cv2.resize(img, new_dim, interpolation=cv2.INTER_AREA)

wm_scale = 50

wm_width = int(watermark.shape[1] * wm_scale/100)

wm_height = int(watermark.shape[0] * wm_scale/100)

wm_dim = (wm_width, wm_height)

resized_wm = cv2.resize(watermark, wm_dim, interpolation=cv2.INTER_AREA)

h_img, w_img, _ = resized_img.shape

center_y = int(h_img)

center_x = int(w_img)

h_wm, w_wm, _ = resized_wm.shape

top_y = center_y - int(h_wm)

left_x = center_x - int(w_wm)

bottom_y = top_y + h_wm

right_x = left_x + w_wm

roi = resized_img[top_y:bottom_y, left_x:right_x]

result = (1 - 0.3) * roi + 0.3 * resized_wm

resized_img[top_y:bottom_y, left_x:right_x] = result

filename = 'Watermakred_Image.jpg'

cv2.imwrite("E:\Mikolaj\Documents\Projekty\Image Proc\lab10\myWatermarked0.3.tiff", resized_img)

cv2.imshow("Resized Input Image", resized_img)

cv2.waitKey(0)

cv2.destroyAllWindows()

# aplha = 0

img = cv2.imread('Image Proc\lab10\male.tiff')

watermark = cv2.imread("Image Proc\lab10\watermark.jpg")

percent_of_scaling = 50

new_width = int(img.shape[1] * percent_of_scaling/100)

new_height = int(img.shape[0] * percent_of_scaling/100)

new_dim = (new_width, new_height)

resized_img = cv2.resize(img, new_dim, interpolation=cv2.INTER_AREA)

wm_scale = 50

wm_width = int(watermark.shape[1] * wm_scale/100)

wm_height = int(watermark.shape[0] * wm_scale/100)

wm_dim = (wm_width, wm_height)

resized_wm = cv2.resize(watermark, wm_dim, interpolation=cv2.INTER_AREA)

h_img, w_img, _ = resized_img.shape

center_y = int(h_img)

center_x = int(w_img)

h_wm, w_wm, _ = resized_wm.shape

top_y = center_y - int(h_wm)

left_x = center_x - int(w_wm)

bottom_y = top_y + h_wm

right_x = left_x + w_wm

roi = resized_img[top_y:bottom_y, left_x:right_x]

result = (1 - 0) * roi + 0 * resized_wm

resized_img[top_y:bottom_y, left_x:right_x] = result

filename = 'Watermakred_Image.jpg'

cv2.imwrite("E:\Mikolaj\Documents\Projekty\Image Proc\lab10\myWatermarked0.tiff", resized_img)

cv2.imshow("Resized Input Image", resized_img)

cv2.waitKey(0)

cv2.destroyAllWindows()

#invisibles

img = cv2.imread('Image Proc\lab10\male.tiff')

watermark = cv2.imread("Image Proc\lab10\watermark.jpg")

percent_of_scaling = 50

new_width = int(img.shape[1] * percent_of_scaling/100)

new_height = int(img.shape[0] * percent_of_scaling/100)

new_dim = (new_width, new_height)

resized_img = cv2.resize(img, new_dim, interpolation=cv2.INTER_AREA)

wm_scale = 50

wm_width = int(watermark.shape[1] * wm_scale/100)

wm_height = int(watermark.shape[0] * wm_scale/100)

wm_dim = (wm_width, wm_height)

resized_wm = cv2.resize(watermark, wm_dim, interpolation=cv2.INTER_AREA)

h_img, w_img, _ = resized_img.shape

center_y = int(h_img)

center_x = int(w_img)

h_wm, w_wm, _ = resized_wm.shape

top_y = center_y - int(h_wm)

left_x = center_x - int(w_wm)

bottom_y = top_y + h_wm

right_x = left_x + w_wm

roi = resized_img[top_y:bottom_y, left_x:right_x]

result = 4 * (roi / 4) + resized_wm / 64

resized_img[top_y:bottom_y, left_x:right_x] = result

filename = 'Watermakred_Image.jpg'

cv2.imwrite("E:\Mikolaj\Documents\Projekty\Image Proc\lab10\myWatermarkedINvisible.tiff", resized_img)

cv2.imshow("Resized Input Image", resized_img)

cv2.waitKey(0)

cv2.destroyAllWindows()
