import json
from random import random

path = 'd:/2_Work/Y2_courseworks/Instability_Rover/Instability/Command/'

with open(path+'data/pathNodes.json', 'w') as json_file:
    json.dump({}, json_file, indent = 4, sort_keys=True)

# EDGES AND NODES ------------------------------------------------------------
with open(path+'data/nodes.json', 'r') as nodes:
    nodes_dict = json.load(nodes)

updated_dict={}
for n in nodes_dict:
    if nodes_dict[n]['id'][0] != 'l':
        updated_dict[len(updated_dict)] = nodes_dict[n]

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


# SQUAL ---------------------------------------------------------------------
squal = {
    "name": "squal",
    "data": [
        {"x": 0, "y":0 }
    ]
}
with open(path+'data/squal.json', 'w') as json_file:
    json.dump(squal, json_file, indent = 4, sort_keys=True)


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

# arena is L=3.7m by l=2.4m approx

for i in range(36): #L
    radar['data'].append([])
    for j in range(24):   #l
        # radar['data'][i].append(0)
        radar['data'][i].append(round(random()*10, 2))

with open(path+'data/radar.json', 'w') as json_file:
    json.dump(radar, json_file, indent = 4, sort_keys=True)