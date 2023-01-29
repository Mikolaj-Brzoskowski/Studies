import pyswarms as ps
from pyswarms.utils.functions import single_obj as fx
from pyswarms.utils.plotters import plot_cost_history, plot_contour, plot_surface
import matplotlib.pyplot as plt

# Set-up optimizer
options = {'c1':0.5, 'c2':0.3, 'w':0.9}
optimizer = ps.single.GlobalBestPSO(n_particles=50, dimensions=2, options=options)
optimizer.optimize(fx.ackley, iters=100)
# Plot the cost
plot_cost_history(optimizer.cost_history)
plt.show()

from pyswarms.utils.plotters.formatters import Mesher, Designer

# Plot the sphere function's mesh for better plots
m = Mesher(func=fx.ackley,
           limits=[(-1,1), (-1,1)])
# Adjust figure limits
d = Designer(limits=[(-1,1), (-1,1), (-0.1,1)],
             label=['x-axis', 'y-axis', 'z-axis'])

plot_contour(pos_history=optimizer.pos_history, mesher=m, designer=d, mark=(0,0))
plt.show()

pos_history_3d = m.compute_history_3d(optimizer.pos_history) # preprocessing
animation3d = plot_surface(pos_history=pos_history_3d,
                           mesher=m, designer=d,
                           mark=(0,0,0))  

plt.show()

# Set-up optimizer
options = {'c1':0.5, 'c2':0.3, 'w':0.9}
optimizer = ps.single.GlobalBestPSO(n_particles=50, dimensions=2, options=options)
optimizer.optimize(fx.booth, iters=100)
# Plot the cost
plot_cost_history(optimizer.cost_history)
plt.show()

from pyswarms.utils.plotters.formatters import Mesher, Designer

# Plot the sphere function's mesh for better plots
m = Mesher(func=fx.booth,
           limits=[(-1,1), (-1,1)])
# Adjust figure limits
d = Designer(limits=[(-1,1), (-1,1), (-0.1,1)],
             label=['x-axis', 'y-axis', 'z-axis'])

plot_contour(pos_history=optimizer.pos_history, mesher=m, designer=d, mark=(0,0))
plt.show()

pos_history_3d = m.compute_history_3d(optimizer.pos_history) # preprocessing
animation3d = plot_surface(pos_history=pos_history_3d,
                           mesher=m, designer=d,
                           mark=(0,0,0))  

plt.show()

# Set-up optimizer
options = {'c1':0.5, 'c2':0.3, 'w':0.9}
optimizer = ps.single.GlobalBestPSO(n_particles=50, dimensions=2, options=options)
optimizer.optimize(fx.threehump, iters=100)
# Plot the cost
plot_cost_history(optimizer.cost_history)
plt.show()

from pyswarms.utils.plotters.formatters import Mesher, Designer

# Plot the sphere function's mesh for better plots
m = Mesher(func=fx.threehump,
           limits=[(-1,1), (-1,1)])
# Adjust figure limits
d = Designer(limits=[(-1,1), (-1,1), (-0.1,1)],
             label=['x-axis', 'y-axis', 'z-axis'])

plot_contour(pos_history=optimizer.pos_history, mesher=m, designer=d, mark=(0,0))
plt.show()

pos_history_3d = m.compute_history_3d(optimizer.pos_history) # preprocessing
animation3d = plot_surface(pos_history=pos_history_3d,
                           mesher=m, designer=d,
                           mark=(0,0,0))  

plt.show()