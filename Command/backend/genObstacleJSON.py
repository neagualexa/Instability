import json

# path = 'd:/2_Work/Y2_courseworks/Instability_Rover/Instability/Command/instability_command/components/'
path = 'c:/Users/ishaa/OneDrive - Imperial College London/Projects/Instability/Command/'

def genObstacleJSON():
    # the path is with relation to where the code is run from
    with open(path+'data/nodes.json', 'r') as nodes:
        nodes_dict = json.load(nodes)

    ob_node = json.load(open(path+'data/obstacle.json', 'r'))

    # add end_node into the nodeJSON to be read by the webpage
    # GENERATING THE ID SHOULD BE MADE EVEN MORE COMPLEX TO NOT RUN OUT OF VALUES
    newNodeID = 'o' + str(len(nodes_dict)+1)
    new_node = {
        'id': newNodeID,
        'position': ob_node['position']
    }
    nodes_dict[newNodeID] = new_node # assume the start node is already in the mapJSON
    print('obstacle:: ', ob_node)
    print(nodes_dict)

    # WRITING BACK all nodes in json
    with open(path+'data/nodes.json', 'w') as json_file:
      json.dump(nodes_dict, json_file, indent = 4, sort_keys=True)
