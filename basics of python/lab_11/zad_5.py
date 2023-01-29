import math

def sito(n,t):
    copy=t[:]
    i=0
    while i<n:
        copy[i] = True
        i+=1
    i=0
    while (i < math.sqrt(n)):
        if copy[i]:
            k=2
            j=(i+2)*k
            while (j<n):
                copy[j]=False
                k+=1
                j=(i+2)*k
        i+=1
    i=0
    while i<n:
        if copy[i]:
            if (t[i]) != 0 and (t[i] != 1):
                print(t[i])
            i+=1
        else:
            i+=1
    
print(sito(20,[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]))
