def suma(liczba):
    if liczba < 10:
        return liczba
    else:
        return suma(int(liczba/10)) + suma(liczba%10)


print(suma(123142341234))