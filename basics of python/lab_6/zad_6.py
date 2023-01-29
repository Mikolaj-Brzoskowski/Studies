macierz = [ [10,9,8],
            [1,2,3],
            [4,5,6],
            [7,8,9]]

wynik = []


for i in range(len(macierz)):
    suma = 0
    for j in range(len(macierz[i])):
        suma += macierz[i][j]
    wynik.append(suma)

max = wynik[0]
for i in wynik:
    if i > max:
        max = i

for i in range(len(wynik)):
    if wynik[i] == max:
        print("Numwer wiersza z największą sumą:", i+1)