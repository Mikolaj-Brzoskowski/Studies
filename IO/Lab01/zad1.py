def prime(number):
    if number > 1:
        for i in range(2, int(number/2+1)):
            if number % i == 0:
                return False
        else:
            return True
    else: 
        return False

def select_prime(tab):
    result = []
    for item in tab:
        if prime(item):
            result.append(item)
    return result


# print(prime(3))
# print(prime(4))
# print(prime(5))
# print(prime(7))
# print(prime(9))
# print(prime(11))
# print(prime(13))
# print(prime(15))
# print(prime(17))
# print(prime(49))

print(select_prime([3, 6, 11, 25, 19]))

