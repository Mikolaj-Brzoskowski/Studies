lista = [10,20,30,1,2,3,10]

def delete(x):
    copy = lista.copy()
    inx = 1
    for i in copy:
        for j in range(inx,len(copy)):
            if i == copy[j]:
                copy[j] = 'del'
        inx +=1
    while 'del' in copy:
        copy.remove('del')
    return copy

print(delete(lista))