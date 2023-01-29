import time
import os
number = input("Wprowadz liczbe: ")

print("Wprowadziles liczbe: " + str(number))

f = open("/home/LABPK/mbrzoskowski/mbrzoskowski/Wspol/lab1/dane.txt", "w")
f.write(str(number))
f.close()
while not os.path.exists("/home/LABPK/mbrzoskowski/mbrzoskowski/Wspol/lab1/wyniki.txt"):
    time.sleep(1)
f = open("/home/LABPK/mbrzoskowski/mbrzoskowski/Wspol/lab1/wyniki.txt", "r")
for line in f:
    print("Wynik obliczenia: " + str(line))
f.close()
os.remove("/home/LABPK/mbrzoskowski/mbrzoskowski/Wspol/lab1/wyniki.txt")