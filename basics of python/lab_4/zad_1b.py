napis1 = "informatyka"
napis2 = "programowanie"
i = 0
j = 0

for x in napis1:
    i += 1

for x in napis2:
    j += 1 

if i > j:
    print("Dłuższe jest słowo", napis1, "o", i - j, "liter")
elif j > i:
    print("Dłuższe jest słowo", napis2, "o", j - i, "liter")
else:
     print("Oba słowa są równej długości")