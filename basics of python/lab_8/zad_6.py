def suma(lista):
    if len(lista) == 0:
        return 0
    else:
        return suma(lista[1:]) + lista[0]

print(suma([1,2,3,4,5,6]))
