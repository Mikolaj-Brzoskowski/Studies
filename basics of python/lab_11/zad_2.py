t=[0,1,2,3,4,5,6,7]
k=6
L=0
P=P=len(t)-1

def bin_s(t,k,L,P):
    copy=t[:]
    if (L<P):
        M=int((L+P)/2)
        if (copy[M]<k):
            L=M+1
            return bin_s(t,k,L,P)
        else:
            P=M
            return bin_s(t,k,L,P)
    if (copy[L]==k):
        return L
    else:
        return None

print(bin_s(t,k,L,P))