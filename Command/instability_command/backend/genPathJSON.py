import json

def genPath():
    with open('./components/data/nodes.json', 'r') as nodes:
        nodes_dict = json.load(nodes)
    with open('./components/data/pathNode.json', 'r') as p:
        path_dict = json.load(p)

    for p in path_dict:
        found = False
        for n in nodes_dict:
            if path_dict[p]['id'] == nodes_dict[n]['id']:
                found = True
                break
        if found == False:
            nodes_dict[p] = path_dict[p]
            print('path n:: ', path_dict[p])
    
    print(nodes_dict)

    with open('./components/data/nodes.json', 'w') as json_file:
        json.dump(nodes_dict, json_file, indent = 4, sort_keys=True)

# genPath()