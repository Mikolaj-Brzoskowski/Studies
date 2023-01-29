from .history import *
import datetime

def getDate():
    now_date = datetime.date.today()
    return now_date

class Account():
    def __init__(self, number, money = 0):
        self.number = number
        self.money = money
        self.history = []

    def printMoney(self):
        print("Account number",self.number, "has", self.money, "$")

    def deposit(self, income):
        if income > 0:
            self.money += income
            self.history.append(Acc_operation(getDate(),self.number, +income, "deposit"))
            self.printMoney()
        else:
            print("Error, number of money you want to deposit must be greater than zero")
            return False

    def withdraw(self, expenditure):
        if expenditure > 0: 
            if self.money-expenditure >= 0:
                self.money -= expenditure
                self.history.append(Acc_operation(getDate(),self.number, -expenditure, "withdraw"))
                self.printMoney()
            else:
                print("Error, not enought money on account. Please change your ammount of money to withdraw")
                return False
        else:
            print("Error, number of money you want to withdraw must be greater than zero")
            return False

    
    def sendTo(self, receiver, ammount):
        if ammount > 0:
            if self.money-ammount >= 0:
                self.withdraw(ammount)
                receiver.deposit(ammount)
                self.history.append(Payment(getDate(), self.number, receiver.number, -ammount))
                receiver.history.append(Payment(getDate(), receiver.number, self.number, ammount))
            else:
                print("Error, not enought money on account. Please change your ammount of money to send")
                return False
        else:
            print("Error, number of money you want to send must be greater than zero")
            return False

    def showWholeHistory(self):
        for i in self.history:
                print(vars(i))

    def showHistoryByDate(self, dateInterval):
        for i in self.history:
            if dateInterval.contains(i.date):
                print(vars(i))