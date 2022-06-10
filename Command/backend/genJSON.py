import json

# path = 'd:/2_Work/Y2_courseworks/Instability_Rover/Instability/Command/instability_command/components/'
path = 'd:/2_Work/Y2_courseworks/Instability_Rover/Instability/Command/'

def genJSON():
  # the path is with relation to where the code is run from
  with open(path+'data/nodes.json', 'r') as nodes:
    nodes_dict = json.load(nodes)

  start_node = json.load(open(path+'data/start.json', 'r'))
  end_node = json.load(open(path+'data/end.json', 'r'))
  edges_dict = json.load(open(path+'data/edges.json', 'r'))

  # add end_node into the nodeJSON to be read by the webpage
  # GENERATING THE ID SHOULD BE MADE EVEN MORE COMPLEX TO NOT RUN OUT OF VALUES
  newNodeID = 'p' + str(len(nodes_dict)+1)
  found = False
  for n in nodes_dict:
    if nodes_dict[n]['position'] == end_node['position']:
      found = True

  if found == False:
    new_node = {
      'id': newNodeID,
      'position': end_node['position']
    }
    nodes_dict[newNodeID] = new_node # assume the start node is already in the mapJSON
    print('start:: ', start_node)
    print('end::     ', end_node)
    print(nodes_dict)

    # ADDing the live path nodes
    with open(path+'data/pathNodes.json', 'r') as old_paths:
      old_path_dict = json.load(old_paths)
    for p in old_path_dict:
      nodes_dict[old_path_dict[p]['id']] = old_path_dict[p]
    print("Including live nodes: ", nodes_dict)

    # WRITING BACK all nodes in json
    with open(path+'data/nodes.json', 'w') as json_file:
      json.dump(nodes_dict, json_file, indent = 4, sort_keys=True)

    # 
    # 
    # generate edge/path just completed
    for n in nodes_dict:
      exists = False
      # if start node exists in the map already
      if start_node['position'] == nodes_dict[n]['position']:
        exists = True
        source = nodes_dict[n]['id']
        newEdgeID = 'edge' + str(len(edges_dict)+1)
        target=new_node['id']

        id = 'e'+source+'-'+target
        edges_dict[newEdgeID] = { 'id': id, 'source': source, 'target': target }
        print(edges_dict)

        # UPDATING currentNode
        with open(path+'data/currentNode.json', 'w') as json_file:
          json.dump(new_node, json_file, indent = 4, sort_keys=True)

        # WRITEBACK the new edge added onto edge list
        with open(path+'data/edges.json', 'w') as json_file:
          json.dump(edges_dict, json_file, indent = 4, sort_keys=True)

        break
    
    if exists == False:
      print("ERROR:: Starting position does not exist in the map. Edge not created")
  
  else:
    print("Achtung: ", end_node, " already exists!")

# genJSON()