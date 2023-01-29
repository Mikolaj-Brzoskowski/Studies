def newton(n,k):
    if k == 0 or k == n:
        return 1
    else:
        return newton(n-1,k-1) + newton(n-1,k) 

print(newton(3,2))