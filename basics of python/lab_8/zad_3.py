napis = 'kot'

def odw(napis):
    if len(napis) == 0:
        return napis
    else:
        return odw(napis[1:]) + napis[0]
        
print(odw(napis))