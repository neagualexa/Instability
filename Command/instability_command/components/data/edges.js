const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' , sourceHandle: 'left_out',   targetHandle: 'right_in'}, //West
  { id: 'e1-3', source: '1', target: '3' , sourceHandle: 'bottom_out', targetHandle: 'top_in'}, //South
  { id: 'e1-4', source: '1', target: '4' , sourceHandle: 'top_out',    targetHandle: 'bottom_in'}, //North
  { id: 'e1-5', source: '1', target: '5' , sourceHandle: 'right_out',  targetHandle: 'left_in'}, //East
  // check if coord of either source and target MUST source > target 
  // as in is on the top and out pn the bottom
];

export default initialEdges;
