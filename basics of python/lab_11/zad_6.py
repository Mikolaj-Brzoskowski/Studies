def sort_i(t):
    copy_t = t[:]
    n=len(copy_t)
    j = n - 2
    while (j >= 0):
        p=copy_t[j]
        i=j+1
        while (i<n) and (p>copy_t[i]):
            copy_t[i-1]=copy_t[i]
            i=i+1
        copy_t[i-1]=p
        j=j-1
    print(copy_t)
    return copy_t

def bin_s(t,k):
    L=0
    P=len(t)-1
    while (L<P):
        M=int((L+P)/2)
        if (t[M]<k):
            L=M+1
        else:
            P=M
    if (t[L]==k):
        return L
    else:
        return None


