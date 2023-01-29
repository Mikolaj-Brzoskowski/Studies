from .Adress import Adress
from uuid import uuid4 as id

class Worker:
    def __init__(self, name, surname, age, exp, adress):
        self.id = id()
        self.name = name
        self.surname = surname
        self.age = age
        self.exp = exp
        self.adress = adress
        
    @property
    def name(self):
        return self._name
    
    @name.setter
    def name(self, name):
        self._name = name
        
    @property
    def surname(self):
        return self._surname
    
    @surname.setter
    def surname(self, surname):
        self._surname = surname
        
    @property
    def age(self):
        return self._age
    
    @age.setter
    def age(self, age):
        if age < 100:
            self._age = age
        else:
            raise ValueError("Age must be lower than 100")
            
    @property
    def exp(self):
        return self._exp
    
    @exp.setter
    def exp(self, exp):
        if exp >= 0: 
            self._exp = exp
        else:
            raise ValueError("Exp must be greater than 0")

    @property
    def adress(self):
        return self._adress
    
    @adress.setter
    def adress(self, adress):
        self._adress = adress
        
    def change_adress(self, street, houseNumber, apartmentNumber, city):
        self._adress = Adress(street, houseNumber, apartmentNumber, city)
        
    def __str__(self):
        return str(self.__class__) + ": " + str(self.__dict__)
    