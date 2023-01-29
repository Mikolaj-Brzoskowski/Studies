# Wejście:
# Pierwsza linia zawiera liczbę całkowitą określającą liczbę przypadków testowych. Każdy przypadek testowy to jeden graf, który jest opisany w dwóch kolejnych liniach. Pierwsza linia jest postaci n=x, m=y gdzie x i y są liczbami określającymi liczbę wierzchołków i krawędzi grafu. 
# Druga linia opisująca graf zawiera listę krawędzi oddzielonych spacjami. Każda krawędź jest postaci {u,v}w gdzie u,v to wierzchołki należące do krawędzi, natomiast w jest liczbą całkowitą będącą wagą krawędzi. Wierzchołki numerujemy liczbami 0,...,n-1. 

# Wyjście: 
# Dla każdego przypadku testowego należy w osobnej linii wypisać liczbę będącą sumą wag krawędzi należących do minimalnego drzewa spinającego lub informacja, ze graf jest niespójny i drzewo spinające nie istnieje.

# Przykład 

# Wejście: 
# 3 
# n=6,m=9 
# {0,1}1 {0,5}3 {1,2}9 {1,3}7 {1,5}5 {2,3}8 {3,4}5 {3,5}2 {4,5}4 
# n=7,m=12 
# {0,1}2 {0,2}1 {0,3}2 {0,4}1 {0,5}2 {0,6}1 {1,2}4 {1,6}4 {2,3}3 {3,4}4 {4,5}6 {5,6}8
# n=5,m=3
# {0,1}1 {0,2}1 {0,3}3

# Wyjście: 
# 18 
# 9
# graf niespójny - brak drzewa spinającego

import igraph as ig
import matplotlib.pyplot as plt
import numpy as np
from lab1 import stworz_nieskierowany, zwroc_graf

def rysuj_graf(graph, weights):
    fig, ax = plt.subplots(figsize=(5,5))
    ig.plot(
        graph,
        target=ax,
        layout="circle",
        vertex_size=0.1,
        vertex_frame_width=4.0,
        vertex_frame_color="white",
        vertex_label = graph.vs["name"],
        vertex_label_size=7.0,
        edge_label = weights
    )
    plt.show()
    
cycles = {
    3: [    [0,1,1],
            [1,0,1],
            [1,1,0]
            ],
    4: [ [0,1,0,1],
         [1,0,1,0],
         [0,1,0,1],
         [1,0,1,0]],
    5: [[0,1,0,0,1],
        [1,0,1,0,0],
        [0,1,0,1,0],
        [0,0,1,0,1],
        [1,0,0,1,0]],
    6: [[0,1,0,0,0,1],
        [1,0,1,0,0,0],
        [0,1,0,1,0,0],
        [0,0,1,0,1,0],
        [0,0,0,1,0,1],
        [1,0,0,0,1,0]]
}
    
def graf_izomorficzny(zewn):
    if len(vertices_added) >= 3:
        for i in range(3, 7):
            stworz_nieskierowany(cycles[i])
            cycle = zwroc_graf()
            result = zewn.subisomorphic_lad(cycle, return_mapping=True)
            if result[0]:
                return True
        return False
    return False

t = int(input("Podaj liczbę przypadków testowych: "))
vertices_edges_count = []
all_edges = []
for i in range(0, t):
    n, m = [int(x) for x in input("Podaj liczbę wierzchołków i krawędzi: ").split(",")]
    vertices_edges_count.append([n,m])
    input_edges = [edge for edge in input("Podaj krawedzie: ").split(" ")]
    if len(input_edges) != m:
        print("Wprowadzono złą ilość krawędzi!")
        quit()
    all_edges.append(input_edges)

for i in range(0, t):
    n, m = vertices_edges_count[i]
    current_edges = all_edges[i]
    edges = []
    weights = []
    for edge in current_edges:
        edge = edge.replace("{", ""). replace("}", " ").replace(",", " ").split(" ")
        edges.append([int(edge[0]), int(edge[1])])
        weights.append(int(edge[2]))
    np_edges = np.array(edges).flatten()
    for j in np_edges:
        if j > n:
            print("Wprowadzono złe wierzchołki w krawędziach!")
            quit()
    g = ig.Graph()
    g.add_vertices(n)
    g.vs["name"] = range(0,n)
    g.add_edges(edges)
    g.es['weight'] = weights
    rysuj_graf(g, weights)
    
    
    idx = np.argsort(weights)
    edges_sorted = np.array(edges)[idx]
    weights_sorted = np.array(weights)[idx]
    MST = ig.Graph()
    vertices_added = []
    weights_added = []
    weight = 0
    MST.vs["name"] = vertices_added
    
    for idx, edge_sorted in enumerate(edges_sorted):
        first = False
        second = False
        if str(edge_sorted[0]) not in vertices_added:
            MST.add_vertices(str(edge_sorted[0]))
            vertices_added.append(str(edge_sorted[0]))
            first = True
            #rysuj_graf(MST, weights_added)
        if str(edge_sorted[1]) not in vertices_added:
            MST.add_vertices(str(edge_sorted[1]))
            vertices_added.append(str(edge_sorted[1]))
            second = True
            #rysuj_graf(MST, weights_added) 
        MST.add_edges([(str(edge_sorted[0]), str(edge_sorted[1]))])
        weights_added.append(weights_sorted[idx])
        #rysuj_graf(MST, weights_added)
        if graf_izomorficzny(MST):
            MST.delete_edges([(str(edge_sorted[0]), str(edge_sorted[1]))])
            weights_added.remove(weights_sorted[idx])
            #rysuj_graf(MST, weights_added) 
            if first:
                MST.delete_vertices(str(edge_sorted[0]))
                vertices_added.remove(str(edge_sorted[0]))
                #rysuj_graf(MST, weights_added)
            if second:
                MST.delete_vertices(str(edge_sorted[1]))
                vertices_added.remove(str(edge_sorted[1]))
                #rysuj_graf(MST, weights_added)
        else:
            weight += weights_sorted[idx]
        if len(vertices_added) == n:
            break
            
            
    if len(vertices_added) == n:
        rysuj_graf(MST, weights_added)
        print("Przypadek testowy nr" + str(i+1) + ": " + str(weight))
    else:
        print("Graf niespójny, drzewo nie istnieje")
