# Zaimplementuj algorytm Christofidesa - uwaga na warunek trójkąta!

import networkx as nx
from ast import literal_eval
import numpy as np
import matplotlib.pyplot as plt
from networkx.algorithms import approximation

with open("kombinatoryka\lab06\graph.txt", 'r') as f:
  graph = literal_eval('[' + ''.join(f.readlines()) + ']')
  
def draw_with_wages(input_graph, type):
    if type == "circular":
        layout = nx.circular_layout(input_graph)
    if type == "random":
        layout = nx.random_layout(input_graph)
    nx.draw(input_graph, layout, node_size=1000, with_labels=True, font_weight='bold', font_size=15)
    labels = nx.get_edge_attributes(input_graph,'weight')
    nx.draw_networkx_edge_labels(input_graph,pos=layout,edge_labels=labels)
    plt.show()

def count_odd(input_graph):
    degrees = [val for (node, val) in input_graph.degree()]
    nodes = []
    for count, i in enumerate(degrees):
        if i % 2 == 1:
            nodes.append(count)
    return nodes
    
G = nx.from_numpy_matrix(np.matrix(graph), create_using=nx.Graph)
draw_with_wages(G, "circular")
T = nx.minimum_spanning_tree(G, weight='weight',  algorithm='kruskal')
draw_with_wages(T, "circular")
nodes = count_odd(T)
N = nx.induced_subgraph(G, nodes)
draw_with_wages(N, "random")
M = N.edge_subgraph(nx.min_weight_matching(N, maxcardinality=None, weight='weight')).copy()
draw_with_wages(M, "random")
edges = []
for edge in M.edges():
    edges.append(edge)
for edge in T.edges():
    edges.append(edge)
H = nx.MultiGraph(incoming_graph_data=edges)
layout = nx.shell_layout(H)
nx.draw(H, layout, node_size=1000, with_labels=True, font_weight='bold', font_size=15)
ax = plt.gca()
for e in H.edges:
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
if nx.is_eulerian(H):
    cicle = list(nx.eulerian_circuit(H))
    cicle_nodes = [u for u, v in cicle]
    cicle_nodes.append(cicle[len(cicle_nodes)-1][1])
    christofides = list(dict.fromkeys(cicle_nodes))
    christofides.append(cicle_nodes[0])
    solution = approximation.christofides(G, weight='weight')
    if christofides == solution:
        print(christofides)
    else:
        print("Błąd, wbudowana funkcja zwróciła inny wynik")
        print("Wbudowana funkcja:" + solution)
        print("Własny zaimplementowany algorytm" + christofides)
else:
    print("Błąd, graf nie eulerowski")