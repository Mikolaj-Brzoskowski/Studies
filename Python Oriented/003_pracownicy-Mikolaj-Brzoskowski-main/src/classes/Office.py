from uuid import uuid4 as id
from .Worker import Worker

class Office(Worker):
    def __init__(self, name, surname, age, exp, adress, iq):
        super().__init__(name, surname, age, exp, adress)
        self.iq = iq
        self.company_id = id()
        
    @property
    def iq(self):
        return self._iq
    
    @iq.setter
    def iq(self, iq):
        if iq >= 70 and iq <= 150:
            self._iq = iq
        else:
            raise ValueError("Iq must be between 70 and 150")
    
    def __str__(self):
        return str(self.__class__) + ": " + str(self.__dict__)