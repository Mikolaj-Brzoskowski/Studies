lista = [   [1,2,3],
            [4,5,6],
            [7,8,9],
            [10,11,12]]

wynik = []
i = 0

for i in range(len(lista[i])):
    temp = []
    for j in range(len(lista)):
        temp.append(lista[j][i])
    wynik.append(temp)

print(wynik)

