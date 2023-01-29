from .classes import *
import unittest
import io
import sys

worker_1 = Manual('jonh', 'queen', 33, 3, Adress('pomorska', 1, 2, 'gdansk'), 70)
worker_2 = Office('jonh', 'king', 32, 4, Adress('koscielna', 1, 2, 'gdynia'), 90)
worker_3 = Trader('jonh', 'jack', 32, 3, Adress('miodowa', 1, 2, 'sopot'), 23, 'NISKA')
worker_4 = Trader('jonh', 'ace', 33, 3, Adress('czerwona', 1, 2, 'gdynia'), 23, 'NISKA') 

class RegisterTestCase(unittest.TestCase):
        
    def setUp(self) -> None:
        self.register = Register()
        self.register.add_worker(worker_1,
                                  worker_2,
                                  worker_3,
                                  worker_4)
        
    def test_addworkerError(self):
        with self.assertRaises(TypeError):
            self.register.add_worker('123')
            
    def test_addworker(self):
        self.register.add_worker(Manual('niclaus', 'queen', 33, 3, Adress('jasieniowa', 1, 2, 'gdansk'), 70),
                                Office('john', 'kowalski', 32, 4, Adress('koscielna', 1, 2, 'radom'), 90))
        self.assertEqual(len(self.register.workers), 6)
        
    def test_deleteWorker(self):
        self.register.del_worker(worker_1.id)
        self.assertEqual(len(self.register.workers), 3)
        
    def test_deleteWorkerError(self):
        worker_5 = (Manual('niclaus', 'queen', 33, 3, Adress('jasieniowa', 1, 2, 'gdansk'), 70))
        with self.assertRaises(ValueError):
            self.register.del_worker(worker_5.id)
        
    def test_print_sorted(self):                                                                          
        self.assertEqual(self.register.print_sorted(), [worker_2,
                                                        worker_3,
                                                        worker_4,
                                                        worker_1])
        
    def test_print_city(self):                   
        self.assertEqual(self.register.print_city('gdynia'),[worker_2, worker_4])
        
    def test_print_value(self):
        self.assertEqual(self.register.print_value(),[worker_1, 'value=6.363636363636363',
                                                    worker_2, 'value=360',
                                                    worker_3, 'value=180',
                                                    worker_4, 'value=180',])
        
    