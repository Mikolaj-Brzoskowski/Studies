class Adress:
    def __init__(self, city, country, street, number):
        self.city = city
        self.country = country
        self.street = street
        self.number = number

    def  __eq__(self, other):
        return (self.city == other.city and
                self.country == other.country and
                self.street == other.street and
                self.number == other.number)