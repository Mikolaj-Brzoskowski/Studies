from .Trader import Trader
from .Manual import Manual
from .Office import Office
from operator import attrgetter

class Register:
    def __init__(self):
        self.workers = []
        
    def add_worker(self, *workers):
        for worker in workers:
            if isinstance(worker, Manual) or isinstance(worker, Office) or isinstance(worker, Trader):
                self.workers.append(worker)
            else:
                raise TypeError("Worker must be one of the classes: Manual, Office or Trader")
        
    def del_worker(self, id):
        for tab, worker in enumerate(self.workers):
            if worker.id == id:
                del self.workers[tab]
                break
            raise ValueError('No value with id:' + str(id) + 'found')
    
    def print_sorted(self):
        def multisort(xs, specs):
            for key, reverse in reversed(specs):
                xs.sort(key=attrgetter(key), reverse=reverse)
            return xs
        
        sorted = multisort(self.workers, (('exp', True), ('age', False), ('surname', False)))
        for tab_item in sorted:
            print(tab_item, tab_item.adress)
        return sorted
    
    def print_city(self, city):
        city_tab = []
        for worker in self.workers:
            if worker.adress.city == city:
                print(worker)
                city_tab.append(worker)
        return city_tab
    
    def print_value(self):
        value_tab = []
        for worker in self.workers:
            if isinstance(worker, Office):
                value = worker.exp * worker.iq
            elif isinstance(worker, Manual):
                value = worker.exp * worker.strength / worker.age
            elif isinstance(worker, Trader):
                if worker.efficiency == 'NISKA':
                    value = worker.exp  * 60
                if worker.efficiency == 'SREDNIA':
                    value = worker.exp  * 90
                if worker.efficiency == 'WYSOKA':
                    value = worker.exp  * 120
            print(worker, 'value=' + str(value))
            value_tab.extend([worker, 'value=' + str(value)])
        return(value_tab)
            