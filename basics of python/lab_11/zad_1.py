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

print(bin_s([1,2,3,4,5,6,7,8],6))