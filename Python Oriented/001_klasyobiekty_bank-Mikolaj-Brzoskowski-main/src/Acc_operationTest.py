import unittest
from .oop import  *
import datetime
acc = Account(5)

class AccountTestCase(unittest.TestCase):
    
    def setUp(self) -> None:
        self.operation = Acc_operation(datetime.date(2021, 10, 19), acc, 200, 'deposit')

    def test_account_init_done(self):
        self.assertEqual(datetime.date(2021, 10, 19), self.operation.date)
        self.assertEqual(self.operation.Acc_from, acc)
        self.assertEqual(200, self.operation.ammount)
        self.assertEqual('deposit', self.operation.type)