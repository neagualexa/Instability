import ReactFlow, { MiniMap, Controls, Background } from 'react-flow-renderer';
import { useCallback, useState } from 'react';
import { applyEdgeChanges, applyNodeChanges, addEdge } from 'react-flow-renderer';

import initialNodes from './data/nodes.js';
import initialEdges from './data/edges.js';

import alienNode from './alienNode.js';
import positionNode from './positionNode.js';
import './map.css';

const nodeTypes = {
  position: positionNode,
  alien:    alienNode,
};

function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

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

  return (
    <ReactFlow
      // style={reactFlowStyle}
      nodes={nodes}
      edges={edges} 
      nodeTypes={nodeTypes}
      // onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
    >
      <MiniMap />
      <Controls />
      <Background />
    </ReactFlow>
  );
  
}


export default Flow;
