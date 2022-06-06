import json

# path = 'd:/2_Work/Y2_courseworks/Instability_Rover/Instability/Command/instability_command/components/'
path = 'd:/2_Work/Y2_courseworks/Instability_Rover/Instability/Command/'

def genPath():
    with open(path+'data/nodes.json', 'r') as nodes:
        nodes_dict = json.load(nodes)
    # print("nodes read in live genPathJSON: ",nodes_dict)

    # only give one node
    path_new_node = json.load(open(path+'data/pathNode.json', 'r'))

    with open(path+'data/pathNodes.json', 'r') as nodes:
        path_dict = json.load(nodes)

    # for p in path_dict:
    # GENERATING THE ID SHOULD BE MADE EVEN MORE COMPLEX TO NOT RUN OUT OF VALUES
    newNodeID = 'l_' + str(len(path_dict)+1)
    found = False
    for n in path_dict:
        if path_new_node['position'] == path_dict[n]['position']:
            found = True
            break
    if found == False:
        node = {
            'id': newNodeID,
            'position': path_new_node['position']
        }
        nodes_dict[newNodeID] = node
        path_dict[newNodeID] = node
        # print('path n:: ', path_new_node)
    else:
        print("Node with ", path_new_node , " already exists.")
    

    # print("live nodes added to nodes.json: ", nodes_dict)

    # WRITE BACK
    # with open(path+'data/nodes.json', 'w') as json_file:
    #     json.dump(nodes_dict, json_file, indent = 4, sort_keys=True)

    with open(path+'data/pathNodes.json', 'w') as json_file:
        json.dump(path_dict, json_file, indent = 4, sort_keys=True)

# genPath()