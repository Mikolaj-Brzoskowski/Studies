from abc import ABC


class Warehouse(ABC):
    def __init__(self, items_list=[]):
        self.__warehouse_items = items_list

    def addToWarehouse(self, item, price=None):
        for el in self.__warehouse_items:
            if item in el:
                el[1] += 1
                break
        self.__warehouse_items.append([item, 1, price])

    def deleteFromWarehouse(self, item):
        for el in self.__warehouse_items:
            if item in el:
                if el[1] > 0:
                    el[1] -= 1
                    break
                else:
                    raise ValueError("Out of store")
        
    
    
    @property
    def warehouse_items(self):
        return self.__warehouse_items