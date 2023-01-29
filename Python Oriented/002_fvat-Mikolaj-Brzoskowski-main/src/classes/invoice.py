from .person import Person
from .seller import Seller
from random import randint
from datetime import date

def random_with_N_digits(n):
    range_start = 10**(n-1)
    range_end = (10**n)-1
    return randint(range_start, range_end)

class Invoice:
    def __init__(self, person, seller, date_sell, date_pay):
        self.items = []
        self.sum = 0 #sum of items will change on self.items change
        self.client = person
        self.seller = seller
        self.number = random_with_N_digits(20)
        self.date = date.today()
        self.date_sell = date_sell
        self.date_pay = date_pay

    def updateSumAdd(self, item):
        self.sum += item.brutto

    def updateSumRemove(self, item):
        self.sum -= item.brutto

    def addItem(self, item):
        self.items.append(item)
        self.updateSumAdd(item)

    def removeItem(self, item):
        for i, o in enumerate(self.items):
            if o.name == item.name:
                del self.items[i]
                self.updateSumRemove(item)
                break
            raise ValueError("No value")