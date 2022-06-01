import { taggedTemplateExpression } from '@babel/types';
import EdgesJSON from './data/edges.json';
import NodesJSON from './data/nodes.json';

const initialEdges = [
  // { id: 'e00-01', source: 'p00', target: 'p01' , sourceHandle: 'left_out',   targetHandle: 'right_in'}, //West
  // { id: 'e1-3', source: '1', target: '3' , sourceHandle: 'bottom_out', targetHandle: 'top_in'}, //South
  // { id: 'e1-4', source: '1', target: '4' , sourceHandle: 'top_out',    targetHandle: 'bottom_in'}, //North
  // { id: 'e1-5', source: '1', target: '5' , sourceHandle: 'right_out',  targetHandle: 'left_in'}, //East
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
          targetHandle: getTargetHandle(i),
          hidden: false,
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
  // console.log("target x: ", t.position.x, "; target y: ", t.position.y)
  // console.log("source x: ", s.position.x, "; source y: ", s.position.y)
  if (t.position.x > s.position.x + 30) {
    if (t.position.y > s.position.y + 30) {
      //Quadrant 4
      tag = "top_in";
    } else if (t.position.y < s.position.y - 30) {
      //Quadrant 1
      tag = "bottom_in"
    } else {
      tag = "left_in"
    }
  } else if (t.position.x < s.position.x - 30) {
    if (t.position.y > s.position.y + 30) {
      //Quadrant 3
      tag = "top_in"
    } else if (t.position.y < s.position.y - 30) {
      tag = "bottom_in"
    } else {
      //Quadrant 2
      tag = "right_in";
    }
  } else {
    if (t.position.y >= s.position.y) {
      tag = "top_in"
    } else {
      tag = "bottom_in"
    } 
      //overlay the nodes, too close(should not happen)    
  }
  return tag;
}

export function hideEdges(edg){
  for (let i in edg) {
    if (edg[i]['hidden'] == true){
      edg[i]['hidden'] = false;
    } else {
      edg[i]['hidden'] = true;
    }
  }
  console.log("Hidden/Not hidden edges!");
  return edg;
}

export default initialEdges;
