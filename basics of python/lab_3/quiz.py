a = 3
b = 2
c = 4

if a < b:
    if a < c:
        min = a
    else:
        min = c
else:
    if b < c:
        min = b
    else:
        min = c

print(min)