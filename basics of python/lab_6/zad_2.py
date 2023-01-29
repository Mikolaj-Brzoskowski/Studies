macierz = [ [1,2,3],
            [4,5,6],
            [7,8,9],
            [10,11,12],
            [13, 14, 15]]

wynik = []

for i in range(len(macierz)):
    wynik.append(macierz[i][::-1])

print(wynik)