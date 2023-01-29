from random import randint

def random_with_N_digits(n):
    range_start = 10**(n-1)
    range_end = (10**n)-1
    return randint(range_start, range_end)

class Person:
    def __init__(self, name, adress):
        self.name = name
        self.adress = adress
        self.nip = random_with_N_digits(10)

    def changeAdress(self, adress):
        self.adress = adress