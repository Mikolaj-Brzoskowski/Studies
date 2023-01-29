a = 20
b = 40
c = 5

def minima(x,y,z):
    if x <= y and x <= z:
        return x
    elif y <= x and y <=z:
        return y
    elif z <= x and z <= y:
        return z

print(minima(a,b,c))
