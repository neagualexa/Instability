import json

path = 'd:/2_Work/Y2_courseworks/Instability_Rover/Instability/Command/'

with open(path+'data/pathNodes.json', 'w') as json_file:
    json.dump({}, json_file, indent = 4, sort_keys=True)


with open(path+'data/nodes.json', 'r') as nodes:
    nodes_dict = json.load(nodes)

updated_dict={}
for n in nodes_dict:
    if nodes_dict[n]['id'][0] != 'l':
        updated_dict[len(updated_dict)] = nodes_dict[n]

with open(path+'data/nodes.json', 'w') as json_file:
    json.dump(updated_dict, json_file, indent = 4, sort_keys=True)

# with open(path+'data/edges.json', 'w') as json_file:
#     json.dump({}, json_file, indent = 4, sort_keys=True)


connection_graph = {
    "name": "squal",
    "data": [
        {"x": 0, "y":0 }
    ]
}
with open(path+'data/squal.json', 'w') as json_file:
    json.dump(connection_graph, json_file, indent = 4, sort_keys=True)