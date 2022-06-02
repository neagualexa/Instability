import json

def genPath():
    with open('./components/data/nodes.json', 'r') as nodes:
        nodes_dict = json.load(nodes)
    # with open('./components/data/pathNode.json', 'r') as p: //only give one node
    path_new_node = json.load(open('./components/data/pathNode.json', 'r'))

    # for p in path_dict:
    # GENERATING THE ID SHOULD BE MADE EVEN MORE COMPLEX TO NOT RUN OUT OF VALUES
    newNodeID = 'l_' + str(len(nodes_dict)+1)
    found = False
    for n in nodes_dict:
        if path_new_node['position'] == nodes_dict[n]['position']:
            found = True
            break
    if found == False:
        nodes_dict[newNodeID] = path_new_node
        print('path n:: ', path_new_node)
    
    print(nodes_dict)

    with open('./components/data/nodes.json', 'w') as json_file:
        json.dump(nodes_dict, json_file, indent = 4, sort_keys=True)

# genPath()