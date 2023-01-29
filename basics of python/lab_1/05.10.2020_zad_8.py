a = 3
b = 2
if a == 0:
    if b == 0:
        print("Nieskończenie wiele miejsc zerowych")
        quit()
    else:
        print("Brak miejsc zerowych")
        quit()
else:
    x = -b / a
    print(x)