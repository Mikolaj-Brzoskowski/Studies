lista = [1,25,6,7,8,9,10,3,4,5,6,2,3,4]
n = 3

def maxima(lista,n):
    copy = []
    for i in lista:
        if not i in copy:
            copy.append(i)
    for i in range(1, n):
        copy.remove(max(copy))
    return max(copy)

print(maxima(lista,n))