lista1 = [1,5,7,2,3,9]
lista2 = [6,8,4]
wynik = []
inx = 0

lista1.sort()
lista2.sort()

for i in range(len(lista1)):
    while inx < len(lista2):
        if lista1[i] < lista2[inx]:
            wynik += [lista1[i]]
            break
        else:
            wynik += [lista2[inx]]
            inx += 1

print(wynik)