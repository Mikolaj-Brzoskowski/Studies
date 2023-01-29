import unittest
from .oop import  *
import datetime
acc = Account(6)
acc_2 = Account(7)

class AccountTestCase(unittest.TestCase):
    def setUp(self) -> None:
        self.payment = Payment(datetime.date(2021, 10, 10), acc, acc_2, 200)

    def test_history_init(self):
        self.assertEqual(datetime.date(2021, 10, 10), self.payment.date)
        self.assertEqual(acc, self.payment.Acc_from)
        self.assertEqual(acc_2, self.payment.Acc_to)
        self.assertEqual(200, self.payment.ammount)
        self.assertEqual('payment', self.payment.type)