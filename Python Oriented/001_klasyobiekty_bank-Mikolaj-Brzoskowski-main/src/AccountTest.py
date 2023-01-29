import unittest
from .oop import  *

class AccountTestCase(unittest.TestCase):
    def setUp(self) -> None:
        self.account = Account(3)

    def test_account_init_done(self):
        self.assertEqual(3, self.account.number)
        self.assertEqual(0, self.account.money)
        self.assertEqual([], self.account.history)
    
    def test_deposit_money(self):
        self.account.deposit(100)
        self.assertEqual(100, self.account.money)

    def test_deposit_negative_money(self):
        self.assertFalse(self.account.deposit(-50))

    def test_withdraw_money(self):
        self.account.deposit(100)
        self.account.withdraw(20)
        self.assertEqual(80, self.account.money)

    def test_withdraw_money_on_zero(self):
        self.assertFalse(self.account.withdraw(100))

    def test_withdraw_negative_money(self):
        self.account.deposit(100)
        self.assertFalse(self.account.withdraw(-20))

    def test_sendto(self):
        self.account.deposit(200)
        acc = Account(4)
        self.account.sendTo(acc, 100)
        self.assertEqual(100, self.account.money)
        self.assertEqual(100, acc.money)

    def test_sendto_negative(self):
        acc = Account(4)
        self.assertFalse(self.account.sendTo(acc, -100))

    def test_sendto_notEnoughMoney(self):
        acc = Account(4)
        self.account.deposit(50)
        self.assertFalse(self.account.sendTo(acc, 100))
    