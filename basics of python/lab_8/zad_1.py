def pot(a,n):
    if n == 0:
        return 1
    else:
        return a * pot(a,n-1)

print(pot(3,4))