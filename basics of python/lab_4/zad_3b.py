napis = "łabędź"
eng = ['a', 'o', 'e', 'l', 's', 'c', 'n', 'z', 'z']
pol = ['ą', 'ó', 'ę', 'ł', 'ś', 'ć', 'ń', 'ż', 'ź']
wynik = ''

napis_inx = 0
pol_inx = 0

for i in napis:
    pol_inx = 0
    while pol_inx < 9:
        x = pol[pol_inx]
        if x == i:
            i = eng[pol_inx]
            wynik += i
            break
        if pol_inx == 8:
            wynik += i
        pol_inx += 1
    napis_inx += 1
print(wynik)



