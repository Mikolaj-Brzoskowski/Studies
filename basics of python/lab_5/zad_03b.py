lista = [1,2,3,4]
lenght = 0

for i in lista:
    lenght += 1

wynik = [None] * lenght

for i in lista:
    lenght -= 1
    wynik[lenght] = i

print(wynik)