import pandas as pd
import matplotlib.pyplot as plt

miasta = pd.read_csv('E:\Mikolaj\Documents\Projekty\Inteligencja Obliczeniowa\Lab01\miasta.csv')
print(miasta)
print(miasta.values)
miasta.append([2010, 460, 555, 405])
print(miasta)
lata = miasta.loc[:,"Rok"]
gdansk = miasta.loc[:,"Gdansk"]
poznan = miasta.loc[:,"Poznan"]
szczecin = miasta.loc[:,"Szczecin"]
plt.plot(lata.values, gdansk.values, 'ro-', lata.values, poznan.values, 'bo-', lata.values, szczecin.values, 'go-')
plt.legend(['Gdańsk', 'Poznań', 'Szczecin'])
plt.title('Ludnosc w miastach Polski')
plt.xlabel('Lata')
plt.ylabel('Liczba ludnosci')
plt.show()