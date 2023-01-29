class hamming():

    def distance(s1, s2):
        if len(s1) == len(s2):
            return len([i for i in filter(lambda x: x[0] != x[1], zip(s1, s2))])
        else:
            raise ValueError("Dlugosci stringów muszą być równe")