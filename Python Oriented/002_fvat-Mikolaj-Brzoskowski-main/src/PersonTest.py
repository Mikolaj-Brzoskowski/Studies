import unittest
from .classes import *

class PersonTestCase(unittest.TestCase):
    
    def setUp(self) -> None:
        self.person = Person("John K.", Adress("Gdańsk", "Poland", "Grunwaldzka", 10))

    def test_change_adress(self):
        self.person.changeAdress(Adress("Warszawa", "Poland", "Główna", 15))
        self.assertEqual(Adress("Warszawa", "Poland", "Główna", 15), self.person.adress)