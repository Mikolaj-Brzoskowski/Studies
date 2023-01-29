
class DatetimeRange:
    def __init__(self, dt1, dt2):
        self._dt1 = dt1
        self._dt2 = dt2

    def contains(self, dt):
        return self._dt1 < dt < self._dt2

    

