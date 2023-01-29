lista1 = [1,5,7,2,3,9,1]
lista2 = [1,6,9,7]
wynik = []

for i in lista1:
    for j in lista2:
        if i == j:
            if wynik.count(i) == 1:
                break
            else:
                wynik += [i]
    
print(wynik)