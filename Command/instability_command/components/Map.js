import ReactFlow, { MiniMap, Controls, Background, ControlButton } from 'react-flow-renderer';
import { useCallback, useState, useRef, useEffect } from 'react';
import { applyEdgeChanges, applyNodeChanges, addEdge, updateEdge } from 'react-flow-renderer';

import useWindowDimensions from '../screens/getScreenDimensions'

import initialNodes, { generateNodes, hidePath } from './nodes.js';
import initialEdges, { generateEdges, hideEdges } from './edges.js';

import alienNode from './alienNode.js';
import positionNode from './positionNode.js';
import currentPosNode from './currentPosNode.js';
import pathNode from './pathNode.js';
import centeredEdge from './centeredEdge.js'

import './map.css';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BiAddToQueue, BiAnalyse, BiVector } from "react-icons/bi"; {/* https://react-icons.github.io/react-icons/icons?name=bi */ }

const nodeTypes = {
  position: positionNode,
  alien: alienNode,
  currentPos: currentPosNode,
  path: pathNode,
};

const edgeTypes = {
  centered_edge: centeredEdge,
};

function Flow() {
  //nodes and edges are read only
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const yPos = useRef(0);

  //update the map with the json data directly
  generateNodes();

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
    () => setNodes(generateNodes()), [setNodes]
  );
  const genEdges = useCallback(
    () => setEdges(generateEdges()), [setEdges]
  );

  const hidePathNodes = useCallback(
    () => setNodes(hidePath(nodes)), [setNodes]
  );
  const hideEdg = useCallback(
    () => setEdges(hideEdges(edges)), [setEdges]
  );

  const onEdgeUpdate = (oldEdge, newConnection) => setEdges((els) => updateEdge(oldEdge, newConnection, els));


  //TODO: manually add local node to the map to ask rover to move to specific location
  const addNode = useCallback(() => {
    yPos.current += 50;
    var newN = {
      id: "l_"+Math.random(),
      position: { x: 100, y: yPos.current },
      data: { label: "yo" },
      type:'path',
      hidden:false
    };
    nodes.push(newN);
    setNodes((nodes) => {
      // console.log(nodes);
      return [
        ...nodes,
        newN
      ];
    });
  }, []);

  // REPEAT THE GETPATH() TO CONTINUE UPDATING THE WEBPAGE !!!!!!!!!!!!!
  // setInterval(
  //   () => getPath()
  // , 900);

  const getPath = () => {
    var myRequest = new Request('https://localhost:8000/');
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
      // .catch(function (error) {
      //   console.log('Error: ' + error.message)
      // })
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
      console.log("Added node: ", new_path_node)
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
      console.log(nodes);
    } else {
      console.log("Path node ",new_path_node.position," already exists")
    }
  }, []);
  

  function refreshPage() {
    window.location.reload(false);
  }


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
        <Controls showZoom={true} showInteractive={true} showFitView={true} style={{ background: 'white', width: 35, alignItems: 'center' }}>
          <ControlButton onClick={addNode} style={{ width: 25 }}> <BiAddToQueue /> </ControlButton>
          <ControlButton onClick={genNodes} style={{ width: 25 }}> <BiAnalyse /> </ControlButton>
          <ControlButton onClick={hidePathNodes} style={{ width: 25, fontSize: 12 }}> Hide Paths </ControlButton>
          <ControlButton onClick={genEdges} style={{ width: 25 }}> <BiVector /> </ControlButton>
          <ControlButton onClick={hideEdg} style={{ width: 25, fontSize: 12 }}> Hide Edges </ControlButton>
          <button onClick={getPath} style={{ fontSize: 12, background:'white' }}>Path update</button> {/* manual request to read the server */}
          <button onClick={refreshPage} style={{fontSize: 12, background:'white' }}>Reload</button>
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
