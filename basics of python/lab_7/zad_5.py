
def sr(*args):
    if not args:
        return 0
    x = 0
    suma = 0
    for i in args:
        suma += i
        x += 1
    srednia = suma / x
    return srednia

print(sr(2,3))

