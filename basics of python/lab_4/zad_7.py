napis = 'oko'

lenght = 0
x = 0
y = 0
pal = True

for i in napis:
    lenght += 1

if lenght % 2:
    inx = int(lenght / 2)
    x = inx - 1
    y = inx + 1
    while (y) < lenght:
        if napis[x] != napis[y]:
            print('Słowo to nie jest palindromem')
            pal = False
            break
        else:
            x -= 1  
            y += 1
else:
    inx = int(lenght / 2) - 1
    x = inx
    y = inx + 1
    while (y) < lenght:
        if napis[x] != napis[y]:
            print('Słowo to nie jest palindromem')
            pal = False
            break
        else:
            x -= 1  
            y += 1

if pal == True:
    print('Słowo jest palindromem') 