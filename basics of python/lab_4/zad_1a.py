napis1 = "informatyka"
napis2 = "programowanie"

if len(napis1) > len(napis2):
    print("Dłuższe jest słowo", napis1, "o", len(napis1) - len(napis2), "liter")
elif len(napis2) > len(napis1):
    print("Dłuższe jest słowo", napis2, "o", len(napis2) - len(napis1), "liter")
else:
     print("Oba słowa są równej długości")