import json

# path = 'd:/2_Work/Y2_courseworks/Instability_Rover/Instability/Command/instability_command/components/'
path = 'c:/Users/ishaa/OneDrive - Imperial College London/Projects/Instability/Command/'

def genAlienJSON():
  # the path is with relation to where the code is run from
  with open(path+'data/nodes.json', 'r') as nodes:
    nodes_dict = json.load(nodes)

  alien_node = json.load(open(path+'data/alien.json', 'r'))

  # add end_node into the nodeJSON to be read by the webpage
  # GENERATING THE ID SHOULD BE MADE EVEN MORE COMPLEX TO NOT RUN OUT OF VALUES
  newNodeID = 'a' + str(len(nodes_dict)+1)
  found = False
  for n in nodes_dict:
    if nodes_dict[n]['position'] == alien_node['position']:
      found = True

  if found == False:
    new_node = {
      'id': newNodeID,
      'position': alien_node['position'],
      'colour': alien_node['colour']
    }
    nodes_dict[newNodeID] = new_node # assume the start node is already in the mapJSON
    print('current:: ', alien_node)
    print(nodes_dict)

    # WRITING BACK all nodes in json
    with open(path+'data/nodes.json', 'w') as json_file:
      json.dump(nodes_dict, json_file, indent = 4, sort_keys=True)
  
  else:
    print("Achtung: Alien ", alien_node, " already exists!")

# genJSON()