import pygad
import numpy

S = [['zegar', 100, 7], ['obraz-pejzaz', 300, 7], ['obraz-portet', 200, 6], ['radio', 40, 2], ['laptop', 500, 5],
['lampka nocna', 70, 6], ['srebne sztućce', 100, 1], ['porcelana', 250, 3], ['figrura z brązu', 300, 10], ['skórzana torebka', 280, 3],
['odkurzacz', 300, 15]]

#definiujemy parametry chromosomu
#geny to liczby: 0 lub 1
gene_space = [0, 1]

#definiujemy funkcjÄ fitness
def fitness_func(solution, solution_idx):
    S_war = []
    S_waga = []
    for i in S:
        S_war.append(i[1])
        S_waga.append(i[2])
    sum1_war = numpy.sum(solution * S_war)
    sum1_waga = numpy.sum(solution * S_waga)
    if (sum1_waga > 25):
        solution_invert = 1 - solution
        sum2_war = numpy.sum(solution_invert * S_war)
        sum2_waga = numpy.sum(solution_invert * S_waga)
        if (sum2_waga > 25):
            return 0
        else:
            return sum2_war
    #lub: fitness = 1.0 / (1.0 + numpy.abs(sum1-sum2))
    else:
        return sum1_war

fitness_function = fitness_func

#ile chromsomĂłw w populacji
#ile genow ma chromosom
sol_per_pop = 10
num_genes = len(S)

#ile wylaniamy rodzicow do "rozmanazania" (okolo 50% populacji)
#ile pokolen
#ilu rodzicow zachowac (kilka procent)
num_parents_mating = 5
num_generations = 30
keep_parents = 2

#jaki typ selekcji rodzicow?
#sss = steady, rws=roulette, rank = rankingowa, tournament = turniejowa
parent_selection_type = "sss"

#w il =u punktach robic krzyzowanie?
crossover_type = "single_point"

#mutacja ma dzialac na ilu procent genow?
#trzeba pamietac ile genow ma chromosom
mutation_type = "random"
mutation_percent_genes = 8

#inicjacja algorytmu z powyzszymi parametrami wpisanymi w atrybuty
ga_instance = pygad.GA(gene_space=gene_space,
                       num_generations=num_generations,
                       num_parents_mating=num_parents_mating,
                       fitness_func=fitness_function,
                       sol_per_pop=sol_per_pop,
                       num_genes=num_genes,
                       parent_selection_type=parent_selection_type,
                       keep_parents=keep_parents,
                       crossover_type=crossover_type,
                       mutation_type=mutation_type,
                       mutation_percent_genes=mutation_percent_genes)

#uruchomienie algorytmu
ga_instance.run()

#podsumowanie: najlepsze znalezione rozwiazanie (chromosom+ocena)
solution, solution_fitness, solution_idx = ga_instance.best_solution()
print("Parameters of the best solution : {solution}".format(solution=solution))
print("Fitness value of the best solution = {solution_fitness}".format(solution_fitness=solution_fitness))

# #tutaj dodatkowo wyswietlamy sume wskazana przez jedynki
# prediction = numpy.sum(S*solution)
# print("Predicted output based on the best solution : {prediction}".format(prediction=prediction))

#wyswietlenie wykresu: jak zmieniala sie ocena na przestrzeni pokolen
ga_instance.plot_fitness()