def binary(n):
    if n == 0:
        return 0
    if n == 1:
        return 1
    if n % 2 == 1:
        return str(binary(int(n/2))) + str(int(n%2))
    else:
        return str(binary(int(n/2))) + str(int(n%2))

print(binary(1))