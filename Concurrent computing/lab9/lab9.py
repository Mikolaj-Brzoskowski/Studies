import threading
import numpy as np
import math

number_list = []
thread_count = 5

l=1
r=101

for i in range(l,r):
    number_list.append(i)

splitted_array = np.array_split(number_list, thread_count)
lockSuma = threading.Lock()

pierwsze = []

def pierwsza(list, bar, name):
    global pierwsze
    for k in list:
        is_prime = True
        s = math.ceil(math.sqrt(k))
        for i in range (2,s+1):
            if k%i == 0:
                is_prime = False
                break
        if is_prime:
            with lockSuma:
                pierwsze.append(k)
    bar.wait()


thread_list = []

def oblicz(lista):
    b = threading.Barrier(thread_count+1)
    for i in range(0, thread_count):
        t = threading.Thread(target = pierwsza, args = (list(lista[i]), b, f't{i}'))
        thread_list.append(t)
    for thread in thread_list:
        thread.start()
    b.wait()
    return pierwsze

oblicz(splitted_array)
print(pierwsze)