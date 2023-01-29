from .Worker import Worker

class Manual(Worker):
    def __init__(self,  name, surname, age, exp, adress, strength):
        super().__init__(name, surname, age, exp, adress)
        self.strength = strength
        
    @property
    def strength(self):
        return self._strength
    
    @strength.setter
    def strength(self, strength):
        if strength >= 1 and strength <= 100:
            self._strength = strength
        else:
            raise ValueError("Strength must be between 1 and 100")
    
    def __str__(self):
        return str(self.__class__) + ": " + str(self.__dict__)