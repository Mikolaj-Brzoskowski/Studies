import unittest
from .classes import *
from datetime import date
today = date.today()

class InvoiceTestCase(unittest.TestCase):
    
    def setUp(self) -> None:
        self.invoice = Invoice(Person("John K.", Adress("Gdańsk", "Poland", "Grunwaldzka", 10)),
                               Seller("Chi-Chen T.", Adress("Warszawa", "Poland", "Główna", 15)),
                               date(2020,10,10), date(2020, 10, 12))

    def test_add_item(self):
        self.invoice.addItem(Item("komputer", 2, 2999))
        self.assertEqual(1, len(self.invoice.items))

    def test_remove_item(self):
        self.invoice.addItem(Item("komputer", 2, 2999))
        self.invoice.addItem(Item("smartfon", 1, 1999))
        self.invoice.addItem(Item("mysz", 3, 99))
        self.invoice.removeItem(Item("komputer", 2, 2999))
        self.assertEqual(2, len(self.invoice.items))

    
    def test_change_ammountOfItem(self):
        self.invoice.addItem(Item("komputer", 2, 2999))
        self.invoice.items[0].changeAmmount(3)
        self.assertEqual(3, self.invoice.items[0].ammount)
    
    def test_if_sum_correct(self):
        self.invoice.addItem(Item("komputer", 2, 2999))
        self.assertEqual(Decimal('7377.54'), self.invoice.sum)
    
    def test_remove_item_incorrect(self):
        self.invoice.addItem(Item("komputer", 2, 2999))
        with self.assertRaises(ValueError):
            self.invoice.removeItem(Item("smartfon", 1, 1999))

    def test_if_sum_correct_after_removing(self):
        self.invoice.addItem(Item("smartfon", 1, 1999))
        self.invoice.addItem(Item("komputer", 2, 2999))
        self.invoice.removeItem(Item("smartfon", 1, 1999))
        self.assertEqual(Decimal('7377.54'), self.invoice.sum)