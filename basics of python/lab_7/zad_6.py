n = 10
z1 = 1
z2 = 100
import random

def ran(n,z1,z2):
    for i in range(1 , n+1):
        print(random.randint(z1,z2))

ran(n,z1,z2)