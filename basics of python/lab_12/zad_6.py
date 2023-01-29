lista=[
    {   
        'Właściciel': 'Kowalski',
        'PESEL': '0010020304',
        'Marka': 'Audi',
        'Model': 'A5',
        'Rocznik': 2020
    },
    {
        'Właściciel': 'Chlaplewski',
        'PESEL': '0023040506',
        'Marka': 'BMW',
        'Model': 'X5',
        'Rocznik': 2010
    },
    {
        'Właściciel': 'Kowalewski',
        'PESEL': '0010020304',
        'Marka': 'Volsvagen',
        'Model': 'Golf IV',
        'Rocznik': 2008
    }
    ]

def CREATE(właściciel, pesel, marka, model, rocznik):
    lista.append({'Właściciel': właściciel, 'PESEL': pesel, 'Marka': marka, 'Model': model, 'Rocznik': rocznik})

def READ_BY_OWNER(wlasciciel):
    for i in range(len(lista)):
        if lista[i]['Właściciel']==wlasciciel:
            print(lista[i]['Marka'], lista[i]['Model'], lista[i]['Rocznik'])

def READ_BY_PRODUCENT(marka):
    for i in range(len(lista)):
            if lista[i]['Marka']==marka:
                print(lista[i]['Właściciel'], lista[i]['PESEL'], lista[i]['Model'], lista[i]['Rocznik'])

def UPDATE(Właściciel, PESEL, Marka, Model, Rocznik):
    for i in range(len(lista)):
        if lista[i]['Właściciel']==Właściciel:
            if PESEL!= None:
                lista[i]['PESEL']=PESEL
            if Marka != None:
                lista[i]['Marka']=Marka
            if Model != None: 
                lista[i]['Model']=Model
            if Rocznik != None: 
                lista[i]['Rocznik']=Rocznik
            return
        elif lista[i]['PESEL']==PESEL:
            if Właściciel!= None:
                lista[i]['Właściciel']=Właściciel
            if Marka != None:
                lista[i]['Marka']=Marka
            if Model != None: 
                lista[i]['Model']=Model
            if Rocznik != None: 
                lista[i]['Rocznik']=Rocznik
            return
        elif lista[i]['Marka']==Marka:
            if PESEL!= None:
                lista[i]['PESEL']=PESEL
            if Właściciel!= None:
                lista[i]['Właściciel']=Właściciel
            if Model != None: 
                lista[i]['Model']=Model
            if Rocznik != None: 
                lista[i]['Rocznik']=Rocznik
            return
        elif lista[i]['Model']==Model:
            if PESEL!= None:
                lista[i]['PESEL']=PESEL
            if Marka != None:
                lista[i]['Marka']=Marka
            if Właściciel!= None:
                lista[i]['Właściciel']=Właściciel
            if Rocznik != None: 
                lista[i]['Rocznik']=Rocznik
            return
        elif lista[i]['Rocznik']==Rocznik:
            if PESEL!= None:
                lista[i]['PESEL']=PESEL
            if Marka != None:
                lista[i]['Marka']=Marka
            if Model != None: 
                lista[i]['Model']=Model
            if Właściciel!= None:
                lista[i]['Właściciel']=Właściciel
            return

def DELETE(Właściciel, PESEL, Marka, Model, Rocznik):
    for i in range(len(lista)):
        if lista[i]['Właściciel']==Właściciel:
            lista[i]['Właściciel']=None
        elif lista[i]['PESEL']==PESEL:
            lista[i]['PESEL']=None
        elif lista[i]['Marka']==Marka:
            lista[i]['Marka']=None
        elif lista[i]['Model']==Model:
            lista[i]['Model']=None
        elif lista[i]['Rocznik']==Rocznik:
            lista[i]['Rocznik']=None

def SEARCH_COUNT(ilość):
    for i in range(len(lista)):
        counter = 1
        temp=str(lista[i]['Właściciel'])
        for j in range(i, len(lista)):
            if lista[j]['Właściciel']==temp:
                counter+=1
        if counter>ilość:
            print(temp)

def SEARCH_YEAR(rok):
    temp = []
    for i in range(len(lista)):
        if lista[i]['Rocznik']==None:
            continue
        elif lista[i]['Rocznik']<rok:
           temp.append(lista[i]['Właściciel'])
    print(list(set(temp)))


CREATE('Kanada', 'idk', 'costam', 'alaska', 2000)
READ_BY_OWNER('Kowalski')
READ_BY_PRODUCENT('BMW')
UPDATE('Kowalewski', None, None, 'Opel', 2013)
DELETE('Kowalski', None, 'Audi', None, 2013)
SEARCH_COUNT(0)
SEARCH_YEAR(2015)