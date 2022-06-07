import json

# path = 'd:/2_Work/Y2_courseworks/Instability_Rover/Instability/Command/instability_command/components/'
path = 'd:/2_Work/Y2_courseworks/Instability_Rover/Instability/Command/'

def genStatus():
    with open(path+'data/status.json', 'r') as s:
        status_dict = json.load(s)

    # 1 ---------- GENERATE connection graph
    with open(path+'data/squal.json', 'r') as c:
        connection_dict = json.load(c)

    # print(connection_dict)

    connection_dict['data'].append({'x':len(connection_dict['data']), 'y':status_dict['squal']})

    with open(path+'data/squal.json', 'w') as json_file:
        json.dump(connection_dict, json_file, indent = 4, sort_keys=True)