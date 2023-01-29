import pyswarms as ps
from pyswarms.utils.functions import single_obj as fx
from pyswarms.utils.functions.single_obj import sphere
from pyswarms.utils.plotters import plot_cost_history
import matplotlib.pyplot as plt
import numpy as np
import math


def endurance(array):
    if len(array) == 6:
        return -(math.exp(-2*(array[1]-math.sin(array[0]))**2)+math.sin(array[2]*array[3])+math.cos(array[4]*array[5]))

x_max = np.ones(6)
x_min = np.zeros(6)
my_bounds = (x_min, x_max)

options = {'c1': 0.5, 'c2': 0.3, 'w':0.9}

optimizer = ps.single.GlobalBestPSO(n_particles=10, dimensions=6,
options=options, bounds=my_bounds)


def f(x):
    return list(map(endurance, x))

optimizer.optimize(f, iters=100)

cost_history = optimizer.cost_history

# Plot!
plot_cost_history(cost_history)
plt.show()