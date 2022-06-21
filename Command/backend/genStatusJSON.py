import json
from sys import orig_argv

# path = 'd:/2_Work/Y2_courseworks/Instability_Rover/Instability/Command/instability_command/components/'
path = 'd:/2_Work/Y2_courseworks/Instability_Rover/Instability/Command/'

def genStatus():
    with open(path+'data/status.json', 'r') as s:
        status_dict = json.load(s)

    with open(path+'data/pathNode.json', 'r') as s:
        position_dict = json.load(s)

    # 1 ---------- GENERATE SQUAL graph --------------------------------------------------------------------
    with open(path+'data/squal.json', 'r') as c:
        connection_dict = json.load(c)

    # print(connection_dict)

    connection_dict['data'].append({'x':len(connection_dict['data']), 'y':status_dict['squal']})

    with open(path+'data/squal.json', 'w') as json_file:
        json.dump(connection_dict, json_file, indent = 4, sort_keys=True)



    # 2 ---------- GENERATE motors & orientation velocities graph -------------------------------------------
    with open(path+'data/motors.json', 'r') as c:
        motors_dict = json.load(c)

    motors_dict['data']['left'].append({'x':len(motors_dict['data']['left']), 'y':status_dict['motor_left']})
    motors_dict['data']['right'].append({'x':len(motors_dict['data']['right']), 'y':status_dict['motor_right']})
    motors_dict['orientation'] = status_dict['orientation']

    with open(path+'data/motors.json', 'w') as json_file:
        json.dump(motors_dict, json_file, indent = 4, sort_keys=True)

    # 3 ---------- GENERATE RADAR graph --------------------------------------------------------------------
    with open(path+'data/radar.json', 'r') as c:
        connection_dict = json.load(c)

    # TODO: decide on what is transmitted to get the json you want for heatmap

    row =    (position_dict['position']['x'] /4 ) /10
    column = (position_dict['position']['y'] /4 ) /10

    connection_dict['data'][column][row] = status_dict['radar']

    with open(path+'data/radar.json', 'w') as json_file:
        json.dump(connection_dict, json_file, indent = 4, sort_keys=True)

    # 4 ---------- GENERATE ULTRASONIC sensor graph --------------------------------------------------------------------
    with open(path+'data/ultrasonic.json', 'r') as c:
        connection_dict = json.load(c)

    # print(connection_dict)

    connection_dict['data'].append({'x':len(connection_dict['data']), 'y':status_dict['squal']})

    with open(path+'data/ultrasonic.json', 'w') as json_file:
        json.dump(connection_dict, json_file, indent = 4, sort_keys=True)