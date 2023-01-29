lista = [4,6,8,9,2,5,1]
max = lista[0]
wynik = lista[0]

for i in lista:
    if i > max:
        max = i

for i in lista:
    if i > wynik and i < max:
        wynik = i

print(wynik)