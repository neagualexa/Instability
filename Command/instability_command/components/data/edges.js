import { taggedTemplateExpression } from '@babel/types';
import EdgesJSON from './edges.json';
import NodesJSON from './nodes.json'

const initialEdges = [
  { id: 'e00-01', source: 'p00', target: 'p01' , sourceHandle: 'left_out',   targetHandle: 'right_in'}, //West
  // { id: 'e1-3', source: '1', target: '3' , sourceHandle: 'bottom_out', targetHandle: 'top_in'}, //South
  // { id: 'e1-4', source: '1', target: '4' , sourceHandle: 'top_out',    targetHandle: 'bottom_in'}, //North
  // { id: 'e1-5', source: '1', target: '5' , sourceHandle: 'right_out',  targetHandle: 'left_in'}, //East

  // BACKEND and prepare JSON to read
  // check if coord of either source and target MUST source > target 
  // as in is on the top and out pn the bottom
];

let edges = initialEdges;

export function generateEdges(){
  var exists = false;
  for (let i in EdgesJSON) {
    exists = false;
    for(let n in edges){
      if(edges[n].id == EdgesJSON[i].id){
        exists = true;
        // console.log("IF CASE: FOUND NODE");
        break;
      }
    }
    if (!exists){
      edges.push(
        {
          id: EdgesJSON[i].id,
          source: EdgesJSON[i].source,
          target: EdgesJSON[i].target,
          sourceHandle: getSourceHandle(i),
          targetHandle: EdgesJSON[i].targetHandle
          // targetHandle: getTargetHandle(i)
        }
      );
    }
  }
  console.log(edges);
  return edges;
}

let s = { id: '', source: '', target: '' , sourceHandle: '',   targetHandle: ''};
let t = { id: '', source: '', target: '' , sourceHandle: '',   targetHandle: ''}

function getSourceHandle(i) {
  for (let n in NodesJSON) {
    if (EdgesJSON[i].source == NodesJSON[n].id) {
      s = NodesJSON[n];
    }
    if (EdgesJSON[i].target == NodesJSON[n].id) {
      t = NodesJSON[n];
    }
  }
  var tag = "";
  if (t.position.x > s.position.x) {
    if (t.position.y >= s.position.y) {
      //Quadrant 4
      tag = "right_out";
    } else {
      //Quadrant 1
      tag = "top_out"
    }
  } else {
    if (t.position.y >= s.position.y) {
      //Quadrant 3
      tag = "bottom_out"
    } else {
      //Quadrant 2
      tag = "left_out";
    }
  }
  return tag;
}

function getTargetHandle(i) {
  for (let n in NodesJSON) {
    if (EdgesJSON[i].source == NodesJSON[n].id) {
      s = NodesJSON[n];
    }
    if (EdgesJSON[i].target == NodesJSON[n].id) {
      t = NodesJSON[n];
    }
  }
  var tag = "";
  if (t.position.x > s.position.x) {
    if (t.position.y >= s.position.y) {
      //Quadrant 4
      tag = "left_in";
    } else {
      //Quadrant 1
      tag = "bottom_in"
    }
  } else {
    if (t.position.y >= s.position.y) {
      //Quadrant 3
      tag = "top_in"
    } else {
      //Quadrant 2
      tag = "right_in";
    }
  }
  return tag;
}

export default initialEdges;
