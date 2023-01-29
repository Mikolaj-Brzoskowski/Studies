import threading
import random
import numpy as np

number_list = []
thread_count = 10

for i in range(0,100):
    number_list.append(random.randint(1, 10))
    
splitted_array = np.array_split(number_list, thread_count)
lockSuma = threading.Lock()
suma=0

def sumuj(arr):
    global suma
    lockSuma.acquire()
    suma += sum(arr)
    lockSuma.release()

thread_list = []
def oblicz(lista):
    for i in range(0, thread_count):
        t = threading.Thread(target = sumuj, args = (list(lista[i]), ) )
        thread_list.append(t)
    for thread in thread_list:
        thread.start()
    for thread in thread_list:
        thread.join()  
    return suma

oblicz(splitted_array)

if sum(number_list) == suma:
    print("dobrze")
else:
    print("zle"); 