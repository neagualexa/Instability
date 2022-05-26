import ReactFlow, { MiniMap, Controls, Background } from 'react-flow-renderer';
import { useCallback, useState, useRef } from 'react';
import { applyEdgeChanges, applyNodeChanges, addEdge } from 'react-flow-renderer';

import initialNodes from './data/nodes.js';
import initialEdges from './data/edges.js';

import alienNode from './alienNode.js';
import positionNode from './positionNode.js';
import './map.css';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

import {generateNodes} from './data/nodes'

const nodeTypes = {
  position: positionNode,
  alien:    alienNode,
};

function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const yPos = useRef(0);

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

  // const genNodes = useCallback(
  //   nodes.push(generateNodes())
  // );

  // const addNode = useCallback(() => {
  //   setEls((els) => {
  //     console.log(els);
  //     return [
  //       ...els,
  //       {
  //         id: nodes[i].id,
  //         type: nodes[i].type,
  //         position: nodes[i].position,
  //       }
  //     ];
  //   });
  // }, []);

  const addNode = useCallback(() => {
    yPos.current += 50;
    setNodes((nodes) => {
      console.log(nodes);
      return [
        ...nodes,
        {
          id: Math.random(),
          position: { x: 100, y: yPos.current },
          data: { label: "yo" }
        }
      ];
    });
  }, []);


  return (
    <div>
      <ReactFlow
        style={{height:600}} //should be variable
        nodes={nodes}
        edges={edges} 
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        
      >
        <MiniMap />
        <Controls />
        <Background />
        
      </ReactFlow>
      <button onClick={addNode}>Add</button>
    </div>
//     <TouchableOpacity
//     onPress={generateNodes}
//     style={{backgroundColor:"orange"}}
//   >
//   <Text>READ JSON</Text>
// </TouchableOpacity>
  );
  
}

const styles = StyleSheet.create({
  roundButton1: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 80,
    backgroundColor: 'orange',
    // alignSelf: "flex-start",
  },
});

export default Flow;
