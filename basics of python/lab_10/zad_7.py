import random
import time

t1 = []
i = 0
while (i < 10000):
    t1.append(i+1)
    i = i + 1

t2 = []
j = 10000
while ( j > 0):
    t2.append(j)
    j = j - 1

t3 = []
k = 0
while (k < 10000):
    t3.append(random.randint(1, 1000000))
    k = k + 1


def sort_b(t):
    copy_t = t[:]
    j = len(copy_t) - 1
    while (j >= 1):
        i=0
        while (i < j):
            if copy_t[i] > copy_t[i+1]:
                copy_t[i],copy_t[i+1]=copy_t[i+1],copy_t[i]
            i=i+1
        j=j-1
    return copy_t

def sort_i(t):
    copy_t = t[:]
    n=len(copy_t)
    j = n - 2
    while (j >= 0):
        p=copy_t[j]
        i=j+1
        while (i<n) and (p>copy_t[i]):
            copy_t[i-1]=copy_t[i]
            i=i+1
        copy_t[i-1]=p
        j=j-1
    return copy_t

def sort_c(t):
    copy_t=t[:]
    n=len(copy_t)
    j=0
    while (j<n):
        p=j
        i=j+1
        while (i<n):
            if copy_t[i] < copy_t[p]:
                p=i
            i=i+1
        copy_t[j],copy_t[p]=copy_t[p],copy_t[j]
        j=j+1
    return copy_t




start = time.time()
sort_b(t1)
end = time.time()
print(end - start, 'bąbelkowe 1 lista')

start = time.time()
sort_i(t1)
end = time.time()
print(end - start, 'wstawianie 1 lista')

start = time.time()
sort_c(t1)
end = time.time()
print(end - start, 'wybór 1 lista')

start = time.time()
sort_b(t2)
end = time.time()
print(end - start, 'bąbelkowe 2 lista')

start = time.time()
sort_i(t2)
end = time.time()
print(end - start, 'wstawianie 2 lista')

start = time.time()
sort_c(t2)
end = time.time()
print(end - start, 'wybór 2 lista')


start = time.time()
sort_b(t2)
end = time.time()
print(end - start, 'bąbelkowe 3 lista')

start = time.time()
sort_i(t2)
end = time.time()
print(end - start, 'wstawianie 3 lista')

start = time.time()
sort_c(t2)
end = time.time()
print(end - start, 'wybór 3 lista')

