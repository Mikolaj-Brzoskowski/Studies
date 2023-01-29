napis = "To jest zadnie testowe. Test Test Test  "
counter = 1

while napis[-1] == ' ':
    napis_2 = ''
    length = 0
    for i in napis:
        length +=1
    for i in napis[0:length-1]:
        napis_2 += i
    napis = napis_2

for i in napis:
    if i == ' ':
        counter +=1
     
print(counter, 'słów')