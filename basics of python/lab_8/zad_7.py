def check(el, lista):
    if lista == []:
        return True
    if el >= lista[0]:
        lista.pop(0)
        return check(el,lista)
    elif el < lista[0]:
        return False

print(check(4, [1,2,4,3]))