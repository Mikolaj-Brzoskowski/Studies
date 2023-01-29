from oop import  *
import datetime

def createDate(year, month, day):
    return datetime.date(year, month, day)
 
Acc_1 = Account(1, 1000)
Acc_2 = Account(2)

Acc_1.printMoney()
Acc_1.deposit(1000)
Acc_1.withdraw(300)

Acc_2.printMoney()
Acc_2.deposit(5000)
Acc_2.withdraw(1500)

Acc_1.sendTo(Acc_2, 1600)
#Acc_1.showWholeHistory()

Acc_1.showHistoryByDate(DatetimeRange(createDate(2021, 9, 21),createDate(2021,11,10)))