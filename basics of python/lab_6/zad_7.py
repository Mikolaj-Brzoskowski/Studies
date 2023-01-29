lista = [ ["abba","queen","metalica"],
            [1,2,3],
            [4,5,6],
            [7,8,9]]

wynik = []

for i in range(len(lista)):
    for j in range(len(lista[i])):
        wynik.append(lista[i][j])

print(wynik)