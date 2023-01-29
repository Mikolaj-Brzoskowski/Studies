import igraph as ig
import matplotlib.pyplot as plt
from ast import literal_eval

graph = []

with open("kombinatoryka/graph.txt", 'r') as f:
    graph = literal_eval('[' + ''.join(f.readlines()) + ']')

n_vertices = len(graph)

def zwroc_graf():
    return g

#stworzenie grafu skierowanego
def stworz_skierowany(data = None):
    global g
    if data is None:
        g = ig.Graph.Adjacency(graph)
    else:
        g = ig.Graph.Adjacency(data)
    g["title"] = "Mój pierwszy graf"

    name_array = []
    for i in range(1, len(graph)+1):
        name_array.append(i)
        
    g.vs["name"] = name_array
    
#stworzenie grafu nieskierowanego
def stworz_nieskierowany(data = None):
    global g
    if data is None:
        g = ig.Graph.Adjacency(graph, mode = 'undirected')
    else:
        g = ig.Graph.Adjacency(data, mode = 'undirected')
    
    g["title"] = "Mój pierwszy graf"

    name_array = []
    for i in range(1, len(graph)+1):
        name_array.append(i)
        
    g.vs["name"] = name_array


#dodanie wieszkołka z kolejnym numerem
def dodaj_wierzcholek():
    global n_vertices
    n_vertices += 1
    g.add_vertices(str(n_vertices))
    
def usun_wierzcholek(number):
    global n_vertices
    g.delete_vertices(number-1)
    n_vertices -= 1
    
def dodaj_krawedz(wierzcholek_x, wierzcholek_y):
    g.add_edge(wierzcholek_x-1, wierzcholek_y-1)
    
def usun_krawedz(wierzcholek_x, wierzcholek_y):
    g.delete_edges([(wierzcholek_x-1, wierzcholek_y-1)])

#rysowanie grafu
def rysuj_graf():
    fig, ax = plt.subplots(figsize=(5,5))
    ig.plot(
        g,
        target=ax,
        layout="circle",
        vertex_size=0.1,
        vertex_frame_width=4.0,
        vertex_frame_color="white",
        vertex_label=g.vs["name"],
        vertex_label_size=7.0
    )
    plt.show()

#stopień wierzchołka
def stopien(wierzcholek, mode="all"):
    print(g.degree(wierzcholek-1, mode)) 
    
def stopien_min_max(min_max):
    if min_max == "min":
        degrees = []
        for i in range(1, n_vertices+1):
            degrees.append(g.degree(i-1, "all"))
        print(min(degrees))
    elif min_max == "max":
        print(g.maxdegree())
    else:
        print("Error! Invalid argument! Min and max only allowed!")

def even_odd_stopien():
    ev_li = []
    od_li = []
    for i in range(1, n_vertices+1):
        degree = g.degree(i-1, "all")
        if (degree % 2 == 0):
            ev_li.append(degree)
        else:
            od_li.append(degree)
    print("Liczba wierzchołków stopnia parzystego: " + str(len(ev_li)))
    print("Liczba wierzchołków stopnia nieparzystego: " + str(len(od_li)))
    
def stopien_sorted():
    degrees = []
    for i in range(1, n_vertices+1):
        degrees.append(g.degree(i-1, "all"))
    degrees.sort(reverse=True)  
    print(degrees)

#test funkcji

# stworz_skierowany()

# rysuj_graf()

# dodaj_wierzcholek()

# rysuj_graf()

# dodaj_krawedz(3,5)

# rysuj_graf()

# usun_krawedz(1,2)

# rysuj_graf()

# usun_wierzcholek(5)

# rysuj_graf()

# stopien(4, "in")
# stopien(3, "out")
# stopien(3)
# stopien_min_max("min")

# even_odd_stopien()

# dodaj_wierzcholek()

# dodaj_krawedz(3, 5)

# rysuj_graf()

# even_odd_stopien()

# stopien_sorted()