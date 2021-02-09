# importing the required modules
import matplotlib.pyplot as plt
import numpy as np
import math as ma


def f(p, q, r, x):

    a = (p/q - 1) * (p-1)

    b = ((2 * p ** 2) - (p * q + p))/q

    c = (p ** 2 / q) - 1

    l = (-b - ma.sqrt(b ** 2 - 4 * a * c)) / (2 * a)

    ekr = (p - 1) * l + p

    m = 333 * (l + ekr)

    emk = (ekr) ** (-1/r)

    result = m / (l + ((emk)** x) * ekr)
    
    return result
# setting the x - coordinates
x = np.arange(0 , 6, 0.01)

# setting the corresponding y - coordinates
y = list(map(lambda z: f(0.6, 0.05, 1, z), x))

# potting the points
plt.title("A graph of y against x")
plt.plot(x, y, label="this is x")

# function to show the plot
plt.legend()
plt.show()
