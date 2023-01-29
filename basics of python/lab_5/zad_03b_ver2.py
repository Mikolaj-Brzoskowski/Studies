lista = [1,2,3,4]
wynik = []

for i in lista[-1::-1]:
    wynik = wynik + [i]

print(wynik)