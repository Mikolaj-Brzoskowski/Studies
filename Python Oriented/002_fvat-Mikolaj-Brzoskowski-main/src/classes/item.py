from decimal import Decimal

class Item:
    def __init__(self, name, p_netto, ammount = 1,):
        self.name = name
        self.netto = self.check_price(p_netto)
        self.ammount = self.check_ammount(ammount)
        self.sum = self.make_sum(ammount, p_netto)
        self.vat = self.make_vat(self.sum)
        self.brutto = self.make_brutto(self.sum)


    def check_price(self, price):
        if price >= 0:
                return price
        else:
            raise ValueError("Price should be positive value")

    def check_ammount(self, number):
        if number > 0:
            return number
        else:
            raise ValueError("Ammount should be positive value")

    def make_sum(self, ammount, netto):
        return (ammount * netto)

    def make_vat(self, sum):
        vat = Decimal(0.23) * Decimal(sum)
        return round(vat, 2)

    def make_brutto(self, sum):
        brutto = Decimal(1.23) * Decimal(sum)
        return round(brutto, 2)

    def changeAmmount(self, ammount):
        if ammount > 0:
            self.ammount = ammount
        else:
            raise ValueError("Ammount should be positive value")
