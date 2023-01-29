class Payment:

    def __init__(self, date, Acc_from, Acc_to, ammount):
        self.date = date
        self.Acc_from = Acc_from
        self.Acc_to = Acc_to
        self.ammount = ammount
        self.type = "payment"