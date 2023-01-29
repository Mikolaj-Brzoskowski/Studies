macierz = [ [1,2,3],
            [4,5,6],
            [7,8,9],
            [10,11,12],
            [13,14,15]]

k = 2
wynik = []

for i in range(len(macierz)):
    temp = []
    for j in range(len(macierz[i])):
        temp.append(macierz[i][j]*k)
    wynik.append(temp)
    

print(wynik)
