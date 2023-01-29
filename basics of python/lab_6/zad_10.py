lista =[[0,7,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,9,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,9,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,9,0,0,0,0,0,0],]

Zbity = False
# 9 = Hetman
# 7 = Pionek

def Check(Zbity):
    for i in range(len(lista)):
        for j in range(len(lista[i])):
            if lista[i][j] == 7:
                if lista[i].count(9) != 0:
                    Zbity = True
                    return Zbity
                for k in range(len(lista[i])):
                        if lista[k][j] == 9:
                            Zbity = True
                            return Zbity
                x = j
                y = i
                while x > 0 and y > 0:
                    x -= 1
                    y -= 1
                    if lista[y][x] == 9:
                        Zbity = True
                        return Zbity
                x = j
                y = i
                while x < len(lista) - 1 and y < len(lista[i]) - 1:
                    x += 1
                    y += 1
                    if lista[y][x] == 9:
                        Zbity = True
                        return Zbity
                x = j
                y = i
                while x > 0 and y < len(lista[i]) - 1:
                    x -= 1
                    y += 1
                    if lista[y][x] == 9:
                        Zbity = True
                        return Zbity
                x = j
                y = i
                while x < len(lista) - 1 and y > 0:
                    x += 1
                    y -= 1
                    if lista[y][x] == 9:
                        Zbity = True
                        return Zbity
                    
if Check(Zbity) == True:
    print("Pionek zostanie zbity")
else:
    print("Pionek nie zostanie zbity")
