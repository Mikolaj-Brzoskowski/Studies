import unittest
from unittest.mock import Mock
from InvoiceRepository import InvoiceRepository
from Shop import Shop
from Invoice import Invoice
from Warehouse import Warehouse

spy_repository = Mock(InvoiceRepository)
spy_warehouse=Mock(Warehouse([["cukierki", 1, 5.90], ["grześki", 1, 1.50], ["gumy do żucia", 1, 0.30]]))
repository = InvoiceRepository
warehouse = Warehouse([["cukierki", 1, 5.90], ["grześki", 1, 1.50], ["gumy do żucia", 1, 0.30]])

class ShopTests(unittest.TestCase):
        
    def test_while_buy_the_repository_add_should_be_called(self):
        self.shop = Shop(spy_repository, spy_warehouse)
        self.shop.buy(customer="Jan", items_list=["cukierki"])
        spy_repository.add.assert_called_once()
        spy_warehouse.deleteFromWarehouse.assert_called_once()    

    def test_while_returning_goods_the_repository_returns_false_when_not_find(self):
        spy_invoice = Mock(Invoice)
        spy_invoice.items=[]
        self.shop = Shop(spy_repository, spy_warehouse)
        spy_repository.find_by_number.return_value = None
        result = self.shop.returning_goods(spy_invoice)
        self.assertEqual(result, False)
        
    def test_while_returning_goods_the_repository_delete_should_be_called_when_find(self):
        spy_invoice = Mock(Invoice)
        spy_invoice.items=["lizaki"]
        self.shop = Shop(spy_repository, spy_warehouse)
        spy_repository.find_by_number.return_value = Invoice()
        self.shop.returning_goods(spy_invoice)
        spy_repository.delete.assert_called_once()
        spy_warehouse.addToWarehouse.assert_called_once()
        
    def test_out_of_store(self):
        self.shop = Shop(spy_repository, warehouse)
        repository.find_by_number.return_value = None
        with self.assertRaises(ValueError):
            self.shop.buy(customer="Grzegorz", items_list=["grześki", "grześki"])
        

if __name__ == '__main__':
    unittest.main()