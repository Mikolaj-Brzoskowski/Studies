import math
a = 1
b = 1
c = 0

if a == 0:
    if b == 0:
        if c == 0:
            print("Nieskończenie wiele miejsc zerowych")
            quit()
        else:
            print("Brak miejsc zerowych")
            quit()
    else:
        x = -c / b
        print(x)
        quit()

d = b * b - 4 * a * c
if d > 0:
    x_1 = (-b - math.sqrt(d)) / (2 * a)
    x_2 = (-b + math.sqrt(d)) / (2 * a)
    print("X1 =", x_1, "X2 =", x_2)
    quit()
if d == 0:
    x_1 = -b / (2 * a)
    print("X1 =", x_1)
if d < 0:
    print("Brak miejsc zerowych")
    quit()
