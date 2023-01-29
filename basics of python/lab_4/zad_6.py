napis_1 = "znaki"
napis_2 = "napis"
x = 0
wynik = ''

if len(napis_1) == len(napis_2):
    while x < len(napis_1):
        wynik += napis_1[x]
        wynik += napis_2[x]
        x += 1
print(wynik)