lista=[
    {   'Państwo': 'Polska',
        'Stolica': 'Warszawa',
        1: 'Gdańsk',
        2: 'Sopot',
        3: 'Gdynia'
    },
    {   'Państwo': 'USA',
        'Stolica': 'Waszyngton',
        1: 'Nowy York',
        2: 'Chicago',
        3: 'Los Angeles'
    },
    {   'Państwo': 'Niemcy',
        'Stolica': 'Berlin',
        1: 'Hamburg',
        2: 'Drezno',
        3: 'Brema'
    }
    ]

def CREATE(panstwo, stolica, m_1, m_2, m_3):
    lista.append({'Państwo':panstwo, 'Stolica': stolica, 1: m_1, 2: m_2, 3: m_3})

def READ_BY_COUNTRY(panstwo):
    for i in range(len(lista)):
        if lista[i]['Państwo']==panstwo:
            return lista[i]['Stolica'], lista[i][1], lista[i][2], lista[i][3]

def READ_BY_CITY(miasto):
    for i in range(len(lista)):
        for j in range (1,4):
            if lista[i][j]==miasto:
                return lista[i]['Państwo'], lista[i]['Stolica'], lista[i][1], lista[i][2], lista[i][3]

def UPDATE(panstwo, m_1, m_2, m_3):
    for i in range(len(lista)):
        if lista[i]['Państwo']==panstwo:
            if m_1 != None:
                lista[i][1]=m_1
            if m_2 != None:
                lista[i][2]=m_2
            if m_3 != None: 
                lista[i][3]=m_3
            return

def DELETE(panstwo, stolica):
    for i in range(len(lista)):
        if panstwo != None:
            if lista[i]['Państwo']==panstwo:
                del lista[i]
        elif stolica != None:
            if lista[i]['Stolica']==stolica:
                del lista[i]
                print(lista)
                return


CREATE('Kanada', 'idk', 'costam', 'alaska', 'niejestemdobryzgeografii')
print(READ_BY_COUNTRY('Polska'))
print(READ_BY_CITY('Gdynia'))
UPDATE('USA', 'Orlean' , None, 'Las Vegas')
DELETE(None, 'Warszawa')
