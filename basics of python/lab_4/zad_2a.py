napis = "informatyka"
vowels = ['a', 'o', 'e', 'u', 'y', 'i']
count = 0
# a = 0
# x = 0

# while x < len(napis):
#     for i in vowels:
#         if napis[x] == i:
#             count += 1
#     x += 1

for i in vowels:
    count = count + napis.count(i)

print("Liczba samogłosek:", count)
