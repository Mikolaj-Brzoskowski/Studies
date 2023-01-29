napis = "łabędź"
eng = ['a', 'o', 'e', 'l', 's', 'c', 'n', 'z', 'z']
pol = ['ą', 'ó', 'ę', 'ł', 'ś', 'ć', 'ń', 'ż', 'ź']
x = 0

for i in napis:
    for j in pol:
        if i == j:
            x = pol.index(j)
            napis = napis.replace(i, eng[x])
print(napis)



