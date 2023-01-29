napis = "informatyka"
vowels = ['a', 'o', 'e', 'u', 'y', 'i']
count = 0
a = 0
x = 0

for x in napis:
    for i in vowels:
        if x == i:
            count += 1

print("Liczba samogłosek:", count)
