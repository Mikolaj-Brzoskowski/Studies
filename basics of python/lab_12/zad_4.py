lista=[
    {   
        'ID': 0,
        'IMIĘ': 'Jan',
        'NAZWISKO': 'Kowalski',
        'PESEL': '0010020304',
        'WIEK': 21
    },
    {
        'ID': 1,
        'IMIĘ': 'Bożydar',
        'NAZWISKO': 'Chlaplewski',
        'PESEL': '0023040506',
        'WIEK': 67
    },
    {
        'ID': 2,
        'IMIĘ': 'Wiesław',
        'NAZWISKO': 'Kowalewski',
        'PESEL': '0010020304',
        'WIEK': 21
    }
    ]

def CREATE(id, imie, nazwisko, pesel, wiek):
    lista.append({'ID': id,'IMIĘ': imie, 'NAZWISKO': nazwisko, 'PESEL': pesel, 'WIEK': wiek})

def READ(id):
    for i in range(len(lista)):
        if lista[i]['ID']==id:
            return lista[i]['IMIĘ'], lista[i]['NAZWISKO'], lista[i]['PESEL'], lista[i]['WIEK']

def UPDATE(id, imie, nazwisko, pesel, wiek):
    for i in range(len(lista)):
        if lista[i]['ID']==id:
            lista[i]['IMIĘ']=imie
            lista[i]['NAZWISKO']=nazwisko
            lista[i]['PESEL']=pesel
            lista[i]['WIEK']=wiek
            return

def DELETE(id):
    for i in range(len(lista)):
        if lista[i]['ID']==id:
            del lista[i]
            return


CREATE(3, 'Mikołaj', 'Brzoskowski', '1111111111', 20)
print(READ(1))
UPDATE(1, 'Jarosław', 'Jakiśtam', '1234567890', 34)
DELETE(0)
