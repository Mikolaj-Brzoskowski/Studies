from abc import ABC
from Invoice import Invoice
from Warehouse import Warehouse


class Shop(ABC):
    def __init__(self, repository=None, warehouse=None):
        self.__invoice_repository = repository
        self.__warehouse = warehouse

    def buy(self, customer, items_list):
        invoice = Invoice(number=self.invoice_repository.get_next_number(), customer=customer, items=items_list)
        if items_list != None:
            for item in items_list:
                self.warehouse.deleteFromWarehouse(item)
        self.invoice_repository.add(invoice)
        return invoice

    def returning_goods(self, invoice):
        if self.invoice_repository.find_by_number(invoice.number):
            if invoice.items != None:
                for item in invoice.items:
                    self.warehouse.addToWarehouse(item)
            self.invoice_repository.delete(invoice)
            return True
        else:
            return False

    @property
    def invoice_repository(self):
        return self.__invoice_repository

    @property
    def warehouse(self):
        return self.__warehouse