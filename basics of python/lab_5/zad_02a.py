lista = []

import random


for i in range(0,7):
    lista.append(random.randint (0,100))

lista.pop(0)

print(lista[4])
print(lista[1:4])