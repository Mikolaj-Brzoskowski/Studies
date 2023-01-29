from abc import ABC, abstractmethod

class Adress(ABC):
    def __init__(self, street, houseNumber, apartmentNumber, city):
        self._street = street
        self._houseNumber = houseNumber
        self._apartmentNumber = apartmentNumber
        self._city = city
        
    @property
    def street(self):
        return self._street
    
    @street.setter
    def street(self, street):
        self._street = street
        
    @property
    def houseNumber(self):
        return self._houseNumber
    
    @houseNumber.setter
    def houseNumber(self, number):
        self._houseNumber = number
        
    @property
    def apartmentNumber(self):
        return self._apartmentNumber
    
    @apartmentNumber.setter
    def apartmentNumber(self, number):
        self._apartmentNumber = number
        
    @property
    def city(self):
        return self._city
    
    @city.setter
    def city(self, city):
        self._city = city
        
    def __eq__(self, other):
        return (
                self.street == other.street and 
                self.houseNumber == other.houseNumber and
                self.apartmentNumber == other.apartmentNumber and
                self.city == other.city 
                )
        
    def __str__(self):
        return str(self.__class__) + ": " + str(self.__dict__)
    
        
    
