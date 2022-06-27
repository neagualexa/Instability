import json
import random

path = 'd:/2_Work/Y2_courseworks/Instability_Rover/Instability/Command/'

nodes = {}
edges_dict = {}

x = 0
y = 0

for i in range(0,5):
    x = 0
    for j in range(0,7):
        newID = "p_"+str(i)+"_"+str(j)
        new_node = {
            "id": newID,
            "position": {
                "x": x,
                "y": y
            }
        }
        nodes[newID] = new_node
        x +=240
    y += 240

colours = ["rgb(255, 0, 0)", "rgb(255, 255, 0)", "rgb(255, 102, 204)", "rgb(0, 51, 204)", "rgb(51, 153, 102)",  "rgb(0, 153, 0)"]

for i in range (0,6):
    newID = "a_"+str(i)
    x = int(random.randint(0,1440))
    y = int(random.randint(0,960))
    new_node = {
        "id": newID,
        "position": {
            "x": x,
            "y": y
        },
        "colour":colours[i]
    }
    nodes[newID] = new_node

for i in range (0,3):
    newID = "o_"+str(i)
    x = int(random.randint(0,1440))
    y = int(random.randint(0,960))
    new_node = {
        "id": newID,
        "position": {
            "x": x,
            "y": y
        }
    }
    nodes[newID] = new_node


with open(path+'data/nodes.json', 'w') as json_file:
    json.dump(nodes, json_file, indent = 4, sort_keys=True)


for i in range (0,5):
    for j in range (0,7):
        if i % 2 == 0:
            if j != 0 :
                source = "p_"+str(i)+"_"+str(j-1)
                target = "p_"+str(i)+"_"+str(j)
                newEdgeID = 'edge' + source +'/'+ target
                idA = 'e'+source+'-'+target
                edges_dict[newEdgeID+'a'] = { 'id': idA, 'source': source, 'target': target }
                idB = 'e'+target+'-'+source
                edges_dict[newEdgeID+'b'] = { 'id': idB, 'source': target, 'target': source }
                if j == 6 and i < 5:
                    source = "p_"+str(i)+"_"+str(j)
                    target = "p_"+str(i+1)+"_"+str(j)
                    newEdgeID = 'edge' + source +'/'+ target
                    idA = 'e'+source+'-'+target
                    edges_dict[newEdgeID+'a'] = { 'id': idA, 'source': source, 'target': target }
                    idB = 'e'+target+'-'+source
                    edges_dict[newEdgeID+'b'] = { 'id': idB, 'source': target, 'target': source }
        else:
            if j != 6:
                source = "p_"+str(i)+"_"+str(j+1)
                target = "p_"+str(i)+"_"+str(j)
                newEdgeID = 'edge' + source +'/'+ target
                idA = 'e'+source+'-'+target
                edges_dict[newEdgeID+'a'] = { 'id': idA, 'source': source, 'target': target }
                idB = 'e'+target+'-'+source
                edges_dict[newEdgeID+'b'] = { 'id': idB, 'source': target, 'target': source }
                if j == 0 and i < 5:
                    source = "p_"+str(i)+"_"+str(j)
                    target = "p_"+str(i+1)+"_"+str(j)
                    newEdgeID = 'edge' + source +'/'+ target
                    idA = 'e'+source+'-'+target
                    edges_dict[newEdgeID+'a'] = { 'id': idA, 'source': source, 'target': target }
                    idB = 'e'+target+'-'+source
                    edges_dict[newEdgeID+'b'] = { 'id': idB, 'source': target, 'target': source }

        

# WRITEBACK the new edge added onto edge list
with open(path+'data/edges.json', 'w') as json_file:
    json.dump(edges_dict, json_file, indent = 4, sort_keys=True)