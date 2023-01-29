#Zaimplementuj algorytm DFS przeszukiwania dowolnego grafu nieskierowanego prostego oraz wyznaczający dla niego drzewo spinające DFS

from lab1 import *
import numpy as np

odwiedzone = {
    
}
STOS = []
drzewo_DFS = []
edges = []
aktualny_wierzcholek = 3

stworz_nieskierowany()

rysuj_graf()

g = zwroc_graf()

STOS.append(aktualny_wierzcholek)

wierzcholki = g.vs["name"]
for w in wierzcholki:
    odwiedzone[w] = False
    
for edge in g.es:
    source_vertex_id = edge.source+1
    target_vertex_id = edge.target+1
    edges.append([source_vertex_id,target_vertex_id])
    
while STOS != []:
    drzewo_buffer = drzewo_DFS.copy()
    for edge in edges:
        if aktualny_wierzcholek in edge:
            odwiedzone[aktualny_wierzcholek] = True
            this_edge = edge.copy()
            this_edge.remove(aktualny_wierzcholek)
            drugi_wierzcholek = this_edge[0]
            if odwiedzone[drugi_wierzcholek] == False:
                odwiedzone[drugi_wierzcholek] = True
                drzewo_DFS.append([aktualny_wierzcholek,drugi_wierzcholek])
                aktualny_wierzcholek = drugi_wierzcholek
                STOS.append(aktualny_wierzcholek)   
    if drzewo_DFS == drzewo_buffer:   
        STOS.pop()
        if STOS != []:
            aktualny_wierzcholek = STOS[len(STOS) - 1]

for w in wierzcholki:
    for edge in drzewo_DFS:
        if w in edge:
            graf_niespojny = False
            break
        else:
            graf_niespojny = True
if graf_niespojny:
    print("Graf niespojny")
else:
    print(drzewo_DFS)
