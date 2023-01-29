pierwsza = [1,4,5,2]
druga = [4,3,6,5]
ix = 0
suma = 0

while ix < len(pierwsza):
    suma = suma + pierwsza[ix] * druga[ix]
    ix += 1

print(suma)