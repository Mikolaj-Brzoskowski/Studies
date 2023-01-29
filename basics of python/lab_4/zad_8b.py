slowo = 'abba'
pod = 'ab'

czy_jest = False

lenght_slowo = 0
lenght_pod = 0
inx = 0

for i in slowo:
    lenght_slowo += 1

for i in pod:
    lenght_pod += 1



for i in slowo:
    if i == pod[0]:
        x = 1
        while x < lenght_pod and inx + x < lenght_slowo:
            if pod[x] != slowo[inx+x]:
                czy_jest = False
                break
            if lenght_pod - 1 == x:
                czy_jest = True
            x += 1
    inx += 1

if czy_jest == False:
    print('Podsłowo nie pojawia się w słowie')
else:
    print('Podsłowo pojawia się w słowie')