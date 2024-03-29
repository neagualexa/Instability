import ReactFlow, { MiniMap, Controls, Background, ControlButton } from 'react-flow-renderer';
import { useCallback, useState, useRef, useEffect, componentDidUpdate } from 'react';
import { applyEdgeChanges, applyNodeChanges, addEdge, updateEdge } from 'react-flow-renderer';

import useWindowDimensions from '../screens/getScreenDimensions'

import initialNodes, { hidePath, getNodes, hideAllNodes } from './nodes.js';
import initialEdges, { hideEdges, getEdges } from './edges.js';

import alienNode from './alienNode.js';
import obstacleNode from './obstacleNode.js';
import positionNode from './positionNode.js';
import currentPosNode from './currentPosNode.js';
import pathNode from './pathNode.js';
import centeredEdge from './centeredEdge.js';
import goto_positionNode from './goto_positionNode.js';
import manual_gotoNode from './manual_gotoNode';

import './map.css';
import { Text ,TextInput, View } from 'react-native';
import { BiAddToQueue, BiAnalyse, BiVector } from "react-icons/bi"; {/* https://react-icons.github.io/react-icons/icons?name=bi */ }

import { checkState } from './floatingButton.js';




const nodeTypes = {
  position: positionNode,
  alien: alienNode,
  obstacle: obstacleNode,
  currentPos: currentPosNode,
  path: pathNode,
  // goto: goto_positionNode,
  manual_goto: manual_gotoNode
};

const edgeTypes = {
  centered_edge: centeredEdge,
};

function Flow() {
  //nodes and edges are read only
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const yPos = useRef(0);
  const xPos = useRef(0);

  const { height, width } = useWindowDimensions();

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const genNodes = useCallback(
    // () => setNodes(generateNodes()), [setNodes]
    // () => {setNodes(getNodes(nodes), hidePath(nodes))}, [setNodes]
    () => {setNodes(getNodes(nodes))}, [setNodes]
  );
  const genEdges = useCallback(
    // () => setEdges(generateEdges()), [setEdges]
    () => setEdges(getEdges(edges, nodes)), [setEdges]
  );

  const hidePathNodes = useCallback(
    () => setNodes(hidePath(nodes)), [setNodes]
  );
  const hideEdg = useCallback(
    () => setEdges(hideEdges(edges)), [setEdges]
  );

  const onEdgeUpdate = (oldEdge, newConnection) => setEdges((els) => updateEdge(oldEdge, newConnection, els));

  // INTERVAL FOR ALL FETCHES ________________________________________________________________//////////////////////////////
  var intervalID1 = 0;
  
  let updateCycle
  useEffect(() => {
    updateCycle =  setInterval( () => {
        console.log("MAP: update interval: ", checkState)
        var old_nodes = [];
        if(checkState){
            if(old_nodes != nodes){
            getPath(myRequestPATH)
            getNode(myRequestNODE)
            getAlien(myRequestALIEN) //TODO: to be uncommented!!!!!!!
            getObstacle(myRequestOBSTACLE)
            old_nodes = nodes;
            }
        }
      }, 400); 

    return () => clearInterval(updateCycle) // Here is the cleanup function: we take down the timer
  },[])

  // ADD NODES FETCH ________________________________________________________________________________________________________
  var myRequestNODE = new Request('https://localhost:8000/end');
  var myRequestSTARTNODE = new Request('https://localhost:8000/start');
  const getNode = (myRequest) => {
    var start_node = {}
    fetch(myRequestSTARTNODE)
      .then(function (response) {
        if (!response.ok) {
          throw new Error("HTTPS error, status = " + response.status);
        }
        return response.json();
      })
      .then(function (json) {
        // console.log('START connection read:');
        // console.log(json);
        start_node = json;
        return 
        // return (json);
      })

    fetch(myRequest)
      .then(function (response) {
        if (!response.ok) {
          throw new Error("HTTPS error, status = " + response.status);
        }
        return response.json();
      })
      .then(function (json) {
        // console.log('START connection read:');
        // console.log(json);
        addNode(json, start_node);
        return 
        // return (json);
      })
      // .catch(function (error) {
      //   console.log('Error: ' + error.message)
      // })
  };

  const addNode = useCallback((new_node, start_node) => {
    // console.log(start_node)

    var found = false;
    for (let n in nodes) {
      if ((new_node.position.x == nodes[n].position.x) && (new_node.position.y == nodes[n].position.y)) {
        found = true;
        break;
      }
    }
    if (!found) {
      console.log("Added node: ", new_node)
      var new_n = {
        id: "p_" + nodes.length,
        position: new_node['position'],
        type: 'currentPos',
        hidden: false
      };
      setNodes(() => {
        if (!found) {
          // for (let i in nodes){
          //   if(start_node.position.x == nodes[i].position.x && start_node.position.y == nodes[i].position.y) {
          //     nodes[i]["type"] = "position";
          //     break
          //   }
          // }
          
          return [
            ...nodes,
            new_n
          ];
        } else {
          return nodes;
        }
      });
      nodes.push(new_n); 
      // console.log(nodes);
    } else {
      // console.log("Position Node ",new_node_cm.position," already exists")
    }
  }, []);


  // ADD LIVE PATH _____________________________________________________________________________________________________________
  var myRequestPATH = new Request('https://localhost:8000/');
  const getPath = (myRequest) => {
    
    fetch(myRequest)
      .then(function (response) {
        if (!response.ok) {
          throw new Error("HTTPS error, status = " + response.status);
        }
        return response.json();
      })
      .then(function (json) {
        // console.log('START connection read:');
        // console.log(json);
        livePathNode(json);
        return 
        // return (json);
      })
      .catch(function (error) {
        console.log('Error LIVE PATH: ' + error.message)
      })
  };

  const livePathNode = useCallback((new_path_node) => {
    var new_path = {};
    var found = false;
    for (let n in nodes) {
      if ((new_path_node.position.x == nodes[n].position.x) && (new_path_node.position.y == nodes[n].position.y)) {
        found = true;
        break;
      }
    }
    if (!found) {
      // console.log("Added node: ", new_path_node)
      new_path = {
        id: "l_" + Math.random(),
        position: new_path_node['position'],
        type: 'path',
        hidden: false
      };
      setNodes(() => {
        if (!found) {
          return [
            ...nodes,
            new_path
          ];
        } else {
          return nodes;
        }
      });
      nodes.push(new_path); 
      // console.log(nodes);
    } else {
      // console.log("Path node ",new_path_node.position," already exists")
    }
  }, []);


  // ADD ALIEN FETCH ________________________________________________________________________________________________________
  var myRequestALIEN = new Request('https://localhost:8000/alien');
  const getAlien = (myRequest) => {
    
    fetch(myRequest)
      .then(function (response) {
        if (!response.ok) {
          throw new Error("HTTPS error, status = " + response.status);
        }
        return response.json();
      })
      .then(function (json) {
        // console.log('START connection read:');
        // console.log(json);
        addAlien(json);
        return 
        // return (json);
      })
      .catch(function (error) {
        console.log('Error ALIEN: ' + error.message)
      })
  };

  const addAlien = useCallback((new_alien) => {
    var found = false;
    for (let n in nodes) {
      if ((new_alien.position.x == nodes[n].position.x) && (new_alien.position.y == nodes[n].position.y)) {
        found = true;
        break;
      }
    }
    if (!found) {
      console.log("Added alien: ", new_alien)
      var new_n = {
        id: "p_" + nodes.length,
        position: new_alien['position'],
        type: 'alien',
        hidden: false
      };
      new_n.style = { ...new_n.style, backgroundColor: new_alien['colour'] };
      setNodes(() => {
        if (!found) {
          return [
            ...nodes,
            new_n
          ];
        } else {
          return nodes;
        }
      });
      nodes.push(new_n); 
      // console.log(nodes);
    } else {
      console.log("Alien Node ",new_alien.position," already exists")
    }
  }, []);


// ADD OBSTACLE FETCH ________________________________________________________________________________________________________
var myRequestOBSTACLE = new Request('https://localhost:8000/obstacle');
const getObstacle = (myRequest) => {
  
  fetch(myRequest)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("HTTPS error, status = " + response.status);
      }
      return response.json();
    })
    .then(function (json) {
      // console.log('START connection read:');
      // console.log(json);
      addObstacle(json);
      return 
      // return (json);
    })
    .catch(function (error) {
      console.log('Error OBSTACLE: ' + error.message)
    })
};

const addObstacle = useCallback((new_ob) => {
  var found = false;
  for (let n in nodes) {
    if ((new_ob.position.x == nodes[n].position.x) && (new_ob.position.y == nodes[n].position.y)) {
      found = true;
      break;
    }
  }
  if (!found) {
    console.log("Added obstacle: ", new_ob)
    var new_n = {
      id: "o_" + nodes.length,
      position: new_ob['position'],
      type: 'obstacle',
      hidden: false
    };
    setNodes(() => {
      if (!found) {
        return [
          ...nodes,
          new_n
        ];
      } else {
        return nodes;
      }
    });
    nodes.push(new_n); 
    // console.log(nodes);
  } else {
    console.log("Obstacle Node ",new_ob.position," already exists")
  }
}, []);
  

  // MANUALLY ADD NODE _________________________________________________________________________________________
  const [xCoord, setXCoord] = useState(60)
  const [yCoord, setYCoord] = useState(60)

  const addNodeManual = useCallback((xCoord, yCoord) => {
    var newN = {
      id: "gt_"+(nodes.length+1),
      position: { x: xCoord*4, y: (-1)*yCoord*4 },
      type:'manual_goto',
      hidden:false
    };
    console.log(newN.id)
    nodes.push(newN);
    setNodes((nodes) => {
      // console.log(nodes);
      return [
        ...nodes,
        newN
      ];
    });
  }, []);

  // RANDOM MOVE NODE POSITION

  const moveNode = useCallback(()=>{
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id[0] == 'g') {
          console.log("change pos on button click")
          // it's important that you create a new object here
          // in order to notify react flow about the change
          node.position = {x: parseInt(Math.random()*100), y:parseInt(Math.random()*100)}
        }

        return node;
      })
    );
  },[setNodes]);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id[0] == 'g') {
          console.log("change pos from useEffect")
          // it's important that you create a new object here
          // in order to notify react flow about the change
          node.position = {x: parseInt(Math.random()*100), y:parseInt(Math.random()*100)}
        }

        return node;
      })
    );
  },[setNodes]);


  // REFRESH PAGE__________________________________________________________________________________________
  function refreshPage() {
    window.location.reload(false);
  }


  // FRONTEND ______________________________________________________________________________________________
  return (
    <div>
      <ReactFlow
        style={{ height: height - 100 }} //should be variable
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        // edgeTypes={edgeTypes}
        onNodesChange={onNodesChange} //change node positions on map live
        onEdgesChange={onEdgesChange} //change edge positions on map live
        onEdgeUpdate={onEdgeUpdate}
        onConnect={onConnect}
        fitView={{ padding: 0.2 }}
        minZoom={0.1}
        maxZoom={5}

      >
        <MiniMap nodeColor={nodeColour} nodeBorderRadius={5} />
        <Controls showZoom={true} showInteractive={true} showFitView={true} style={{ background: 'white', width: 65, alignItems: 'center' }}>
          <ControlButton onClick={genNodes} style={{ width: 30 }}> <BiAnalyse /> </ControlButton>
          <ControlButton onClick={hidePathNodes} style={{ width: 50, fontSize: 12 ,fontFamily:'space-mono'}}> |Hide| |extra| </ControlButton>
          <ControlButton onClick={genEdges} style={{ width: 30 }}> <BiVector /> </ControlButton>
          <ControlButton onClick={hideEdg} style={{ width: 40,padding:10, fontSize: 12, fontFamily:'space-mono'}}> (Hide) (edges) </ControlButton>
          <ControlButton onClick={getPath} style={{ width: 40,padding:10, fontSize: 12 ,fontFamily:'space-mono'}}>[Path] [update]</ControlButton> {/* manual request to read the server */}
          <ControlButton onClick={refreshPage} style={{ width: 40,padding:10, fontSize: 12 ,fontFamily:'space-mono'}}>Reload</ControlButton>
          <ControlButton onClick={moveNode} style={{ width: 40,padding:10, fontSize: 12 ,fontFamily:'space-mono'}}>Move</ControlButton>

          <View style={{alignItems:'center' , justifyContent:'center', backgroundColor:'white', padding:2}}>

            <strong style={{fontSize: 12, background:'white',fontFamily:'space-mono' }}> Input </strong>
            <strong style={{fontSize: 12, background:'white',fontFamily:'space-mono' }}> coords </strong>
            
            <div style={{flexDirection:'row', flex:3}}>
              <TextInput onChangeText={(val) =>{setXCoord(val)}}
              value={xCoord}
              placeholder="X"
              keyboardType="numeric"
              maxLength={3} 
              style={{width:25, fontSize:12, fontFamily:'space-mono'}}/>
              <Text style={{fontSize:12, fontFamily:'space-mono'}}>;</Text>
              <TextInput onChangeText={(val) => {setYCoord(val)}}
              value={yCoord}
              placeholder="Y"
              keyboardType="numeric"
              maxLength={3} 
              style={{width:25, fontSize:12, fontFamily:'space-mono'}}/>
            </div>
            <ControlButton onClick={()=> {addNodeManual(xCoord,yCoord)}} style={{ width: 25 }}> <BiAddToQueue /> </ControlButton>
          </View>

        </Controls>
        <Background /> {/* dots on the background */}

      </ReactFlow>

    </div>
  );
}

const nodeColour = (node) => {
  switch (node.type) {
    case 'position':
      return '#7cad3e';
    case 'currentPos':
      return '#173042';
    case 'alien':
      return '#8d5b2f';
    default:
      return '#eee';
  }
};

export default Flow;
