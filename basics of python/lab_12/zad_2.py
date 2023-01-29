lista = [
    {'dzień': 30,
     'miesiąc': 7,
    'rok': 1996 },
    {'dzień': 25,
     'miesiąc': 9,
    'rok': 1997 },
    {'dzień': 15,
     'miesiąc': 1,
    'rok': 1999 },
    {'dzień': 22,
     'miesiąc': 7,
    'rok': 1996 },
    {'dzień': 19,
     'miesiąc': 2,
    'rok': 1993 },
]

def sort_d(lista):
    for i in range(len(lista)):
        rok = lista[i]['rok']
        j=i+1
        while j<len(lista):
            if rok>lista[j]['rok']:
                lista[i], lista[j]= lista[j], lista[i]
                j+=1
            else:
                j+=1
    for i in range(len(lista)):
        miesiac = lista[i]['miesiąc']
        j=i+1
        while j<len(lista):
            if miesiac>lista[j]['miesiąc'] and lista[i]['rok']==lista[j]['rok']:
                lista[i], lista[j]= lista[j], lista[i]
                j+=1
            else:
                j+=1
    for i in range(len(lista)):
        dzien = lista[i]['dzień']
        j=i+1
        while j<len(lista):
            if dzien>lista[j]['dzień'] and lista[i]['rok']==lista[j]['rok'] and lista[i]['miesiąc']==lista[j]['miesiąc']:
                lista[i], lista[j]= lista[j], lista[i]
                j+=1
            else:
                j+=1

sort_d(lista)
print(lista)