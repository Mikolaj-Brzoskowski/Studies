napis1 = '1110011'
napis2 = '1001'
wynik = ''
holder =''

inx1 = -1
inx2 = -1

dod = False

while len(wynik) < len(napis1) and len(wynik) < len(napis2) :

    if napis1[inx1] == '1' and napis2[inx2] == '1':
        if dod == True:
            wynik += '1'
        else:    
            wynik += '0'
        inx1 -= 1
        inx2 -= 1
        dod = True
        continue

    if napis1[inx1] == '0' and napis2[inx2] == '0':
        if dod == True:
            wynik += '1'
        else:
            wynik += '0'
        inx1 -= 1
        inx2 -= 1
        dod = False
        continue

    if napis1[inx1] == '0' and napis2[inx2] == '1' or napis1[inx1] == '1' and napis2[inx2] == '0':
        if dod == True:
            wynik += '0'
            dod = True
        else:
            wynik += '1'
            dod = False
        inx1 -= 1
        inx2 -= 1
        continue
    
while inx1 >= -len(napis1):
    if dod == True and napis1[inx1] == 0:
        wynik += '1'
        dod = False
    elif dod == True and napis1[inx1] == 1:
        wynik += '0'
        dod = True
    else:
        wynik += napis1[inx1]
        inx1 -=1
        
while inx2 >= -len(napis2):
    if dod == True and napis2[inx2] == 0:
        wynik += '1'
        dod = False
    elif dod == True and napis2[inx2] == 1:
        wynik += '0'
        dod = True
    else:
        wynik += napis2[inx2]
        inx2 -=1

for i in wynik[-1:-len(wynik)-1:-1]:
    holder += i
wynik = holder

print(wynik)