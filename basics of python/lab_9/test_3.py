
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

def test_pier():
    assert pierwsza(3) == True
    assert pierwsza(5) == True
    assert pierwsza(7) == True
    assert pierwsza(4) == False
    assert pierwsza(9) == False

def delete(x):
    inx = 1
    for i in x:
        for j in range(inx,len(x)):
            if i == x[j]:
                x[j] = 'del'
        inx +=1
    while 'del' in x:
        x.remove('del')
    return x

def test_list():
    assert delete([1,1,1]) == [1]
    assert delete([1,2,3,1,2,3]) == [1,2,3] 
    assert delete([1,2,3,4,5]) == [1,2,3,4,5]
    assert delete([10,20,30,1,2,3,10]) == [10,20,30,1,2,3]
    assert delete([]) == []

def suma(lista):
    if len(lista) == 0:
        return 0
    else:
        return suma(lista[1:]) + lista[0]

def test_suma():
    assert suma([1]) == 1
    assert suma([1,2,3]) == 6
    assert suma([3.24,1.76,8.33]) == 13.33
    assert suma([]) == 0
    assert suma([69, 420]) == 489

def binary(n):
    if n == 0:
        return 0
    if n == 1:
        return 1
    if n % 2 == 1:
        return str(binary(int(n/2))) + str(int(n%2))
    else:
        return str(binary(int(n/2))) + str(int(n%2))

def test_pier():
    assert binary(10) == '1010'
    assert binary(5) == '101'
    assert binary(1) == 1
    assert binary(31) == '11111'
    assert binary(45) == '101101'