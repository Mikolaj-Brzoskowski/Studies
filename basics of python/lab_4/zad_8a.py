slowo = 'kamil'
pod = 'ak'

czy_jest = False

for i in slowo:
    if i == pod[0]:
        x = 1
        while x < len(pod) and slowo.index(i) + x < len(slowo):
            if pod[x] != slowo[slowo.index(i)+x]:
                czy_jest = False
                break
            if len(pod) - 1 == x:
                czy_jest = True
            x += 1

if czy_jest == False:
    print('Podsłowo nie pojawia się w słowie')
else:
    print('Podsłowo pojawia się w słowie')