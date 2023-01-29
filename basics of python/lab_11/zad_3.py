def al_eu(a,b):
    if a != b:
        if a > b:
            a=a-b
            return al_eu(a,b)
        else:
            b=b-a
            return al_eu(a,b) 
    else:
        return a

print(al_eu(16,4))