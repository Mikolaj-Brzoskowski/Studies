liczba = 496

def dosk(x):
    suma = 0
    for i in range(1,int(x/2+1)):
        if x % i == 0:
            suma += i
    if x == suma:
        print('Liczba jest doskonała')
        return True
    else:
        print('Liczba nie jest doskonała')
        return False
        

dosk(liczba)