lista = []

import random


for i in range(-8, -1):
    lista.append(random.randint (0,100))

lista.pop(-7)

print(lista[-2])
print(lista[-5:-2])