import json

def genJSON():
  # the path is with relation to where the code is run from
  with open('./components/data/nodes.json', 'r') as nodes:
    nodes_dict = json.load(nodes)

  current_node = json.load(open('./components/data/currPos.json', 'r'))
  new_node = json.load(open('./components/data/nextPos.json', 'r'))
  edges_dict = json.load(open('./components/data/edges.json', 'r'))

  # add new_node into the nodeJSON to be read by the webpage
  newNodeID = 'node' + str(len(nodes_dict)+1)
  found = False
  for n in nodes_dict:
    if nodes_dict[n]['id'] == new_node['id']:
      found = True
  if found == False:
    nodes_dict[newNodeID] = new_node # assume the current node is already in the mapJSON
    print('current:: ', current_node)
    print('new::     ',new_node)
    print(nodes_dict)

    with open('./components/data/nodes.json', 'w') as json_file:
      json.dump(nodes_dict, json_file, indent = 4, sort_keys=True)

    # generate edge/path just completed
    newEdgeID = 'edge' + str(len(edges_dict)+1)
    source=current_node['id']
    target=new_node['id']
    id = 'e'+source+'-'+target
    edges_dict[newEdgeID] = { 'id': id, 'source': source, 'target': target }
    print(edges_dict)
    with open('./components/data/edges.json', 'w') as json_file:
      json.dump(edges_dict, json_file, indent = 4, sort_keys=True)
  else:
    print("Achtung: ", new_node, " already exists!")

# genJSON()