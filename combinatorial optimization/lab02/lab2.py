# W oparciu o reprezentację grafu prostego w postaci macierzy sąsiedztwa zaimplementuj procedurę, która sprawdza, czy graf zawiera podgraf izomorficzny do cyklu C3. 
# Wersja naiwna. (1 pkt) 
# Wersja w oparciu o mnożenie macierzy. (2 pkt)
# Program powinien wypisywać co najmniej jeden przykładowy cykl C3, o ile istnieje. (1 pkt)

from lab1 import *
import numpy as np

stworz_nieskierowany()

rysuj_graf()

g = zwroc_graf()

C3_matrix = [[0,1,1],
            [1,0,1],
            [1,1,0]
            ]

stworz_nieskierowany(C3_matrix)

C3 = zwroc_graf()

def graf_izomorficzny(zewn, wewn):
    result = zewn.subisomorphic_lad(wewn, return_mapping=True)
    if result[0] == False:
        print(result[0])
    else:
        print("Wierzchołki znalezionego cyklu C3:", [x+1 for x in result[1]])
        return True
        
graf_izomorficzny(g,C3)
        
def izo_naiwny():
    for i in range(0,len(graph)):
        for j in range(0,len(graph)):
            if graph[i][j] == 1:
                for k in range(0,len(graph)):
                    if graph[k][j] == 1 and graph[i][k] == 1: 
                        print("Wierzchołki znalezionego cyklu C3:", [i+1, k+1, j+1])
                        return True
    return False
                  
izo_naiwny()
              
# def graf_izomorficzny_mnozenie():
#     matrix = np.linalg.matrix_power(graph,3)
#     count = int(matrix.trace() / 6)
#     if count > 0:
#         print(True)
#         print("Liczba cyklów: " + str(count))
#     else:
#         print(False)
    
# graf_izomorficzny_mnozenie()

def multiply():
    N = len(graph)
    multiplied = np.zeros(shape=(N,N))
    for i in range(N):
        for j in range(N):
            multiplied[i][j] = 0
            for k in range(N):
                multiplied[i][j] += graph[i][k]*graph[k][j]
    return multiplied

def graf_izomorficzny_mnozenie_v2():
    squared = multiply()
    # print(graph)
    # print(squared)
    for i in range(0,len(graph)):
        for j in range(0,len(graph)):
            if graph[i][j] == 1 and squared[i][j] != 0:
                return(True)
    return(False)
                
print(graf_izomorficzny_mnozenie_v2())