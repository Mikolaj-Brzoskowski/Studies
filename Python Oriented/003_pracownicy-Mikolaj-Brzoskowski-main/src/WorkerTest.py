import unittest
from .classes import *
from uuid import uuid4 as id

class WorkerTestCase(unittest.TestCase):
        
    def test_checkAgeUnderTest(self):
        with self.assertRaises(ValueError):
            self.worker = Worker('Janek', 'Kowalski', 102, 13, Adress('jakastam', 6, 8, 'Gdańsk'))
            
    def test_checkExpTest(self):
        with self.assertRaises(ValueError):
            self.worker = Worker('Janek', 'Kowalski', 43, -3, Adress('jakastam', 6, 8, 'Gdańsk'))
            
    def test_changeAdressTest(self):
        self.worker = Worker('Janek', 'Kowalski', 56, 13, Adress('jakastam', 6, 8, 'Gdańsk'))
        self.worker.change_adress('dluga', 1, 2, 'Gdynia')
        self.assertEqual(Adress('dluga', 1, 2, 'Gdynia'), self.worker._adress)
        
    def test_officesTest(self):
        with self.assertRaises(ValueError):
            self.officeWorker = Office('jonh', 'queen', 32, 3, Adress('asd', 1, 2, 'pomorska'), 50)
            
    def test_traderCommisiontest(self):
        with self.assertRaises(ValueError):
            self.traderWorker = Trader('jonh', 'queen', 32, 3, Adress('asd', 1, 2, 'pomorska'), -13, 'NISKA')
            
    def test_traderEfficiencytest(self):
        with self.assertRaises(ValueError):
            self.traderWorker = Trader('jonh', 'queen', 32, 3, Adress('asd', 1, 2, 'pomorska'), 20, 'test')
            
    def test_manualStrengthtest(self):
        with self.assertRaises(ValueError):
            self.manualWorker = Manual('jonh', 'queen', 32, 3, Adress('asd', 1, 2, 'pomorska'), 130)