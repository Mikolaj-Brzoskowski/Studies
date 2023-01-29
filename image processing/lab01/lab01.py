import numpy

arr = numpy.array([[1, 2, 3], [4, 5, 6], [7, 8,  9]])
print(arr)
print('Rows, Columns: ' + str(arr.shape))
print(arr[0][1])
arr[1][0]=10
print(arr)
for i in range(0, len(arr)):
    for j in range(0, len(arr[i])):
        if arr[i][j] < 5:
            arr[i][j] = 0
        else:
            arr[i][j] = 1
print(arr)