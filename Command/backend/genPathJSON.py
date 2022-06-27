import json

# path = 'd:/2_Work/Y2_courseworks/Instability_Rover/Instability/Command/instability_command/components/'
path = 'd:/2_Work/Y2_courseworks/Instability_Rover/Instability/Command/'

def genPath():
    # only give one node
    path_new_node_cm = json.load(open(path+'data/pathNode.json', 'r'))

    with open(path+'data/pathNodes.json', 'r') as nodes:
        path_dict = json.load(nodes)

    with open(path+'data/nodes.json', 'r') as nodes:
        all_nodes_dict = json.load(nodes)

    # GENERATING THE ID SHOULD BE MADE EVEN MORE COMPLEX TO NOT RUN OUT OF VALUES
    newNodeID = 'l_' + str(len(path_dict)+1)
    print(path_new_node_cm)
    node = {
        'id': newNodeID,
        'position': path_new_node_cm['position']
    }
    path_dict[newNodeID] = node
    all_nodes_dict[newNodeID] = node

    with open(path+'data/pathNodes.json', 'w') as json_file:
        json.dump(path_dict, json_file, indent = 4, sort_keys=True)

    with open(path+'data/nodes.json', 'w') as json_file:
        json.dump(all_nodes_dict, json_file, indent = 4, sort_keys=True)

# genPath()