def NWD(a,b):
    if a != b:
        if a > b:
            a=a-b
            return NWD(a,b)
        else:
            b=b-a
            return NWD(a,b) 
    else:
        return a

def NWW(a,b):
    return ((a*b)/NWD(a,b))

print(NWW(16,4))