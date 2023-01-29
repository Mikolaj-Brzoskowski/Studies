# Zaimplementuj algorytm rozwiązujący problem chińskiego listonosza.
# Do poszczególnych etapów algorytmu dozwolone jest użycie wbudowanych funkcji.

import networkx as nx
from ast import literal_eval
import matplotlib.pyplot as plt
import numpy as np
with open("graph5.txt", 'r') as f:
    graph = literal_eval('[' + ''.join(f.readlines()) + ']')

G = nx.from_numpy_matrix(np.matrix(graph), create_using=nx.MultiGraph)
layout = nx.shell_layout(G)
nx.draw(G, layout, node_size=1000, with_labels=True, font_weight='bold', font_size=15)
# labels = nx.get_edge_attributes(G,'weight')
# nx.draw_networkx_edge_labels(G,pos=layout,edge_labels=labels)
plt.show()

if nx.is_eulerian(G):
    print("Przypadek 1: Graf Eulerowski")
    #algorytm Fleurego
    cicle = list(nx.euler.eulerian_circuit(G))
    print(cicle)
    cicle_nodes = [u for u, v in cicle]
    cicle_nodes.append(cicle[len(cicle_nodes)-1][1])
    print(cicle_nodes)
elif nx.is_semieulerian(G):
    print("Przypadek 2: Graf Półeulerowski")
    path = list(nx.eulerian_path(G, source=1))
    first_node = path[0][0]
    last_node = path[len(path)-1][1]
    print([u for u, v in path])
    path_2 = list(nx.shortest_path(G,last_node,first_node, weight = 'weight'))
    print(path_2)
    final_path = [u for u, v in path] + path_2
    print(final_path)
else:
    if nx.is_connected(G):
        print("Przypadek ogólny")
        degrees = [val for (node, val) in G.degree()]
        nodes = []
        for count, i in enumerate(degrees):
            if i % 2 == 1:
                nodes.append(count)
        SG=nx.complete_graph(len(nodes))
        mapping = {i:node for i,node in enumerate(nodes)}
        SG = nx.relabel_nodes(SG,mapping)
        for edge in SG.edges():
            path = nx.shortest_path(G ,edge[0], edge[1], weight = 'weight')
            sumed_weight = nx.path_weight(G, path, weight='weight')
            SG[edge[0]][edge[1]]['weight'] = sumed_weight
        layout = nx.spring_layout(SG)
        nx.draw(SG, layout, node_size=1000, with_labels=True, font_weight='bold', font_size=15)
        labels = nx.get_edge_attributes(SG,'weight')
        nx.draw_networkx_edge_labels(SG,pos=layout,edge_labels=labels)
        plt.show()
        M = nx.min_weight_matching(SG, maxcardinality=None, weight='weight')
        if nx.is_perfect_matching(SG, M):
            for edge in M:
                path = nx.shortest_path(G, edge[0], edge[1], weight = 'weight')
                for i,node in enumerate(path):
                    if i + 1 < len(path):
                        G.add_edge(node, path[i + 1])
        else:
            print("Błąd, skojarzenie niedokładne")
        layout = nx.shell_layout(G)
        nx.draw(G, layout, node_size=1000, with_labels=True, font_weight='bold', font_size=15)
        ax = plt.gca()
        for e in G.edges:
            ax.annotate("",
                        xy=layout[e[0]], xycoords='data',
                        xytext=layout[e[1]], textcoords='data',
                        arrowprops=dict(arrowstyle="-", color="0.5",
                                        shrinkA=5, shrinkB=5,
                                        patchA=None, patchB=None,
                                        connectionstyle="arc3,rad=rrr".replace('rrr',str(0.3*e[2])
                                        ),
                                        ),
                        )
        plt.axis('off')
        plt.show()
        if nx.is_eulerian(G):
            print("Nowo powstały graf jest eulerowski")
            #algorytm Fleurego
            cicle = list(nx.euler.eulerian_circuit(G))
            print(cicle)
            cicle_nodes = [u for u, v in cicle]
            cicle_nodes.append(cicle[len(cicle_nodes)-1][1])
            print(cicle_nodes)
    else:
        print("Graf niespójny")