import json
from random import random
import numpy as np

path = 'd:/2_Work/Y2_courseworks/Instability_Rover/Instability/Command/'

with open(path+'data/pathNodes.json', 'w') as json_file:
    json.dump({}, json_file, indent = 4, sort_keys=True)

# EDGES AND NODES ------------------------------------------------------------
with open(path+'data/nodes.json', 'r') as nodes:
    nodes_dict = json.load(nodes)

# updated_dict={}
# for n in nodes_dict:
#     if nodes_dict[n]['id'][0] != 'l' and nodes_dict[n]['id'][0] != 'o':
#         updated_dict[len(updated_dict)] = nodes_dict[n]

updated_dict={
        "0": {
        "id": "p_0_0",
        "position": {
            "x": 0,
            "y": 0
        }
    }
}

with open(path+'data/nodes.json', 'w') as json_file:
    json.dump(updated_dict, json_file, indent = 4, sort_keys=True)

edges = {
    "edge0a":{
    "id": "edgep0-p1",
    "source": "p0",
    "target": "p1"
    },
    "edge0b":{
    "id": "edgep1-p0",
    "source": "p1",
    "target": "p0"
    }
}

with open(path+'data/edges.json', 'w') as json_file:
    json.dump(edges, json_file, indent = 4, sort_keys=True)

currentNode = {
    "id": "p0",
    "position": {
        "x": 0,
        "y": 0
    }
}

with open(path+'data/end.json', 'w') as json_file:
    json.dump(currentNode, json_file, indent = 4, sort_keys=True)

with open(path+'data/start.json', 'w') as json_file:
    json.dump(currentNode, json_file, indent = 4, sort_keys=True)

with open(path+'data/currentNode.json', 'w') as json_file:
    json.dump(currentNode, json_file, indent = 4, sort_keys=True)

pathNode = {
    "position": {
        "x": 0,
        "y": 0
    }
}

with open(path+'data/pathNode.json', 'w') as json_file:
    json.dump(pathNode, json_file, indent = 4, sort_keys=True)

with open(path+'data/moveto.json', 'w') as json_file:
    json.dump(pathNode, json_file, indent = 4, sort_keys=True)

with open(path+'data/alien.json', 'w') as json_file:
    json.dump(pathNode, json_file, indent = 4, sort_keys=True)

with open(path+'data/obstacle.json', 'w') as json_file:
    json.dump(pathNode, json_file, indent = 4, sort_keys=True)


# SQUAL ---------------------------------------------------------------------
squal = {
    "name": "squal",
    "data": [
        {"x": 0, "y":0 }
    ]
}
with open(path+'data/squal.json', 'w') as json_file:
    json.dump(squal, json_file, indent = 4, sort_keys=True)

# Ultrasonic ---------------------------------------------------------------------
ultrasonic = {
    "name": "ultrasonic",
    "data": [
        {"x": 0, "y":0 }
    ]
}
with open(path+'data/ultrasonic.json', 'w') as json_file:
    json.dump(ultrasonic, json_file, indent = 4, sort_keys=True)

# Battery ---------------------------------------------------------------------
battery = {
    "name": "battery",
    "data": [
        {"x": 0, "y":100 }
    ]
}
with open(path+'data/battery.json', 'w') as json_file:
    json.dump(battery, json_file, indent = 4, sort_keys=True)


# MOTORS ---------------------------------------------------------------------
motors = {
    "data": {
        "left":[
            {
                "x": 0,
                "y": 0
            }
        ],
        "right":[
            {
                "x": 0,
                "y": 0
            }
        ]
    },
    "orientation": 0,
    "name": "motors"
}
with open(path+'data/motors.json', 'w') as json_file:
    json.dump(motors, json_file, indent = 4, sort_keys=True)

# RADAR ---------------------------------------------------------------------
radar = {
    "name": "radar",
    "data": [
        
    ]
}

# arena is (x)L=3.7m by (y)l=2.4m approx
def makeGaussian(size, fwhm = 4, center=[8,20]):
    """ Make a square gaussian kernel.

    size is the length of a side of the square
    fwhm is full-width-half-maximum, which
    can be thought of as an effective radius.
    """

    x = np.arange(0, size, 1, float)
    y = x[:,np.newaxis]

    if center is None:
        x0 = y0 = size // 2
    else:
        x0 = center[0]
        y0 = center[1]

    return np.exp(-4*np.log(2) * ((x-x0)**2 + (y-y0)**2) / fwhm**2) *100

data = makeGaussian(26)
# print("data::::", data)

for i in range (0,len(data)-1):
    radar['data'].append([])
    for j in data[i]:
        radar["data"][i].append(round(j,2))

# print (radar)



# for i in range(24): #L
#     radar['data'].append([])
#     for j in range(36):   #l
#         radar['data'][i].append(3)
        # radar['data'][i].append(round(random()*10, 2)) # TODO: do not have it random, generate Gausian in a spot


with open(path+'data/radar.json', 'w') as json_file:
    json.dump(radar, json_file, indent = 4, sort_keys=True)