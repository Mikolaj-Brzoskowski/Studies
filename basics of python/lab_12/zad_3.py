import math

punkty={
    1:(1,3),
    2:(3,5),
    3:(7,9),
    4:(1,7),
    5:(1,3),
    6:(9,3)
}

def od(a,b):
    wynik=math.sqrt(((b[0]-a[0])**2) + ((b[1]-a[1])**2))
    return wynik

for i in range(len(punkty)-1):
    i+=1
    j=i+1
    while j <= len(punkty):
        if j==2 or od(punkty[i], punkty[j])<najmniejsza:
            najmniejsza=od(punkty[i], punkty[j])
            A=punkty[i]
            B=punkty[j]
        j+=1
print("Najmniejsza odległość to odległość pomiędzy punktami", A, B, "wynosi:", najmniejsza)
