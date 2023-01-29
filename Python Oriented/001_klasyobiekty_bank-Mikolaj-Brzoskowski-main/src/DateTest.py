import unittest
from .oop import  *
import datetime

class DateTestCase(unittest.TestCase):
    def test_init(self):
        dateinterval = DatetimeRange(datetime.date(2020,1, 9),datetime.date(2020,3,15))
        self.assertEqual(dateinterval._dt1, datetime.date(2020,1, 9))
        self.assertEqual(dateinterval._dt2, datetime.date(2020,3,15))

    def test_checkIntervalTrue(self):
        dateinterval = DatetimeRange(datetime.date(2020,1, 9),datetime.date(2020,3,15))
        self.assertTrue(dateinterval.contains(datetime.date(2020,2,13)))

    def test_checkIntervalFalse(self):
        dateinterval = DatetimeRange(datetime.date(2020,1, 9),datetime.date(2020,3,15))
        self.assertFalse(dateinterval.contains(datetime.date(2020,4,13)))