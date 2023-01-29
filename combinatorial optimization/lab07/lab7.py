
import networkx as nx
from ast import literal_eval
import numpy as np
import matplotlib.pyplot as plt
import networkx as nx
import pandas as pd

def draw_with_wages(input_graph):
    layout = nx.planar_layout(input_graph)
    plt.figure(3,figsize=(12,12))
    nx.draw(input_graph, layout, node_size=500, with_labels=True, font_weight='bold', font_size=10)
    labels = nx.get_edge_attributes(input_graph,'weight')
    nx.draw_networkx_edge_labels(input_graph,pos=layout,edge_labels=labels)
    plt.show()
    
def print_gantt(dict):
    fig, ax = plt.subplots(1, figsize=(16,6))
    ax.barh(dict["tasks"], dict["durations"], left=dict["ES"])
    plt.show()


graph_type = input("Wprowadź typ grafu (AA/AN):")
if graph_type == "AA":
    data = pd.read_csv("kombinatoryka\lab07\AA.csv", sep=';')
    G = nx.DiGraph()
    points = data['points'].to_numpy()
    precedors = data['precedors'].to_numpy()
    durations = data['durations'].to_numpy()
    tasks = data['task'].to_numpy()
    G.add_nodes_from(points)
    for i, point in enumerate(points):
        for precedor, duration in zip(precedors[i],durations[i]):
            if precedor != "-" and precedor != "," and duration != ",":
                G.add_edge(precedor, point, weight=int(duration))
    draw_with_wages(G)
    if nx.is_directed_acyclic_graph(G):
        gantt={
            "tasks": [],
            "durations": [],
            "ES": [],
        }
        ES = []
        LS = []
        critical_path_es = []
        critical_path_ls = []
        for point, dur, prec, task in zip(points, durations, precedors, tasks):
            if prec == "-":
                ES.append(0)
                LS.append(0)
            else:
                list_prec = prec.split(",")
                list_dur = dur.split(",")
                list_task = task.split(",")
                counter_ES = []
                counter_LS = []
                for p,d, t in zip(list_prec,list_dur, list_task):
                    p_index = np.where(points == p)[0][0]
                    counter_ES.append(ES[p_index]+int(d))
                    gantt["tasks"].append(t)
                    gantt["durations"].append(int(d))
                    gantt["ES"].append(ES[p_index])
                    counter_LS.append(LS[p_index]+int(d))
                max_dur = max(counter_ES)
                min_dur = min(counter_LS)
                critical_path_es.append(list_task[counter_ES.index(max_dur)])
                critical_path_ls.append(list_task[counter_LS.index(min_dur)])
                ES.append(max_dur)
                LS.append(min_dur)
        print("ES:" + str(ES))
        print("LS:" + str(LS))
        print("critical_path_es:" + str(critical_path_es))
        print("critical_path_ls:" + str(critical_path_ls))
        print_gantt(gantt)
    else:
        print("Graf nie acykliczny")
elif graph_type == "AN":
    data = pd.read_csv("kombinatoryka\lab07\AN.csv", sep=';')
    G = nx.DiGraph()
    points = data['points'].to_numpy()
    precedors = data['precedors'].to_numpy()
    durations = data['durations'].to_numpy()
    labels = list(zip(points, durations))
    G.add_nodes_from(labels)
    for point, precedor in zip(points, precedors):
        if precedor != "-":
            list_prec = precedor.split(",")
            for p in list_prec:
                p_index = np.where(points == p)[0][0]
                point_index = np.where(points == point)[0][0]
                G.add_edge(labels[p_index], labels[point_index])
    draw_with_wages(G)
    if nx.is_directed_acyclic_graph(G):
        LS = []
        ES = []
        critical_path_LS = []
        critical_path_ES = []
        for point, dur, prec in zip(points, durations, precedors):
            if prec == "-":
                LS.append(0)
                ES.append(0)
            else:
                list_prec = prec.split(",")
                counter_LS = []
                counter_ES = []
                for p in list_prec:
                    p_index = np.where(points == p)[0][0]
                    #counter_LS.append()
                    counter_ES.append(ES[p_index]+durations[p_index])
                #critical_path_LS.append(list_prec[counter_LS.index()])
                critical_path_ES.append((list_prec[counter_ES.index(max(counter_ES))], point))
                #LS.append()
                ES.append(max(counter_ES))
        #print("LS:" + str(LS))
        print("ES:" + str(ES))
        #print("critical_path_es:" + str(critical_path_LS))
        print("critical_path_ls:" + str(critical_path_ES))
    else:
        print("Graf nie acykliczny")
else:
    print("Wprowadzono zły typ grafu!")
    quit()


    
