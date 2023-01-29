lista = [4,6,8,9,2,5,1]
min = lista[0]
max = lista[0]

for i in lista:
    if i > max:
        max = i
    if i < min:
        min = i

print("Min:", min)
print("Max:", max)