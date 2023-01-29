import unittest
from .classes import  *
from decimal import Decimal 

class ItemTestCase(unittest.TestCase):
    
    def setUp(self) -> None:
        self.item = Item("laptop", 1779.50, 3)

    def test_sum(self):
        self.assertEqual(5338.5, self.item.sum)

    def test_vat(self):
        self.assertEqual(Decimal('1227.86'), self.item.vat)

    def test_brutto(self):
        self.assertEqual(Decimal('6566.35'), self.item.brutto)

    def test_change_ammount(self):
        self.item.changeAmmount(6)
        self.assertEqual(6, self.item.ammount)
    
    def test_change_ammount_negative(self):
        with self.assertRaises(ValueError):
            self.item.changeAmmount(-2)
    
    def test_price_negative(self):
        with self.assertRaises(ValueError):
            self.item2 = Item("pc", -5, 2)

    
    
    
