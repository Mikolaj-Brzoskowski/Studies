from .person import Person
from random import randint

def random_with_N_digits(n):
    range_start = 10**(n-1)
    range_end = (10**n)-1
    return randint(range_start, range_end)

class Seller(Person):
    def __init__(self, name, adress):
        super().__init__(name, adress)
        self.acc_num = random_with_N_digits(16)