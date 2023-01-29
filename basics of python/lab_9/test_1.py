
def parzysta(liczba):
    if liczba % 2 == 0:
        return True
    else:
        return False
def test_parzysta():
    assert parzysta(10) == True
    assert parzysta(996) == True
    assert parzysta(1) == False

def a(*args):
    if len(args) == 0:
        print("Brak")
    if len(args) > 0:
        return len(args)

def test_a_1():
    assert a() == None
    assert type(a(1,2,3,4,5)) is int
    assert a(1,2,3,4,5) == 5
    
def test_a_2():
    assert a() == "Brak"