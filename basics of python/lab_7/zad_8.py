liczba = 31

def pierwsza(x):
    if x < 2:
        return False
    elif x == 2:
        return True
    else:
        for i in range(2,x):
            if x % i == 0:
                return False
        return True
    
print(pierwsza(liczba))