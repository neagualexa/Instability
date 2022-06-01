import json


with open('./components/data/nodes.json', 'w') as json_file:
    json.dump({}, json_file, indent = 4, sort_keys=True)

with open('./components/data/edges.json', 'w') as json_file:
    json.dump({}, json_file, indent = 4, sort_keys=True)