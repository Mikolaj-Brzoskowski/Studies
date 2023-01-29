macierz = [ [1,2,3],
            [4,5,6]]

macierz2 = [[7,8,9],
            [10,11,12]]

wynik = []

for i in range(len(macierz)):
    temp = []
    for j in range(len(macierz[i])):
        temp.append(macierz[i][j]+macierz2[i][j])
    wynik.append(temp)

print(wynik)