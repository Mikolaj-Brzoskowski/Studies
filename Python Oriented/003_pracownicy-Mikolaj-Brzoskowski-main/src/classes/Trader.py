from .Worker import Worker

class Trader(Worker):
    def __init__(self, name, surname, age, exp, adress, commission, efficiency):
        super().__init__(name, surname, age, exp, adress)
        self.commission = commission
        self.efficiency = efficiency
        
    @property
    def commission(self):
        return self._commission
    
    @commission.setter
    def commission(self, commission):
        if commission >=0 and commission <= 100:
            self._commission = commission
        else:
            raise ValueError("Commision is percentage and must be between 0 and 100")
        
    @property
    def efficiency(self):
        return self._efficiency
    
    @efficiency.setter
    def efficiency(self, efficiency):
        if efficiency == 'NISKA' or efficiency == 'SREDNIA' or efficiency == 'WYSOKA':
            self._efficiency = efficiency
        else:
            raise ValueError("Efficiency przyjmuje tylko wartosci: NISKA, SREDNIA, WYSOKA")
        
    def __str__(self):
        return str(self.__class__) + ": " + str(self.__dict__)