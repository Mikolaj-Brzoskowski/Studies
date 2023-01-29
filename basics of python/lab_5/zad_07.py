lista = [9,9,9,9]
inx = -2

lista.sort()
while lista[inx] == lista[inx + 1]:
    if inx == -len(lista):
        break
    inx -= 1

print(lista[inx])