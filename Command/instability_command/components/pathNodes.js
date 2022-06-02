import NodesJSON from './data/pathNodes.json';
import currentNode from './data/pathNode.json';

// console.log(NodesJSON);

//NOT USED YET

let initialNodes = [
  {
    id: 'p00',
    type: 'position',
    position: { x: 190, y: 240 },
    hidden: true,
  },
];

console.log(initialNodes);
let nodes = initialNodes;

export function generateNodes(){
  var exists = false;
  for (let i in NodesJSON) {
    exists = false;
    for(let n in nodes){
      // console.log(nodes[n].id, '----', NodesJSON[i].id);
      if(nodes[n].id == NodesJSON[i].id){
        exists = true;
        // console.log("IF CASE: FOUND NODE");
        break;
      }
    }
    if (!exists){
      if(NodesJSON[i].id[0] == "l"){
        nodes.push(
          {
            id: NodesJSON[i].id,
            type: 'path',
            position: NodesJSON[i].position,
            hidden: false
          }
        );
      }
      else {
        //if(NodesJSON[i].id[0] == "p")
        if(currentNode.currPos.id == NodesJSON[i].id) { 
          //should check the postion too to make sure that it has the same coords or to add a new node
          nodes.push(
            {
              id: NodesJSON[i].id,
              type: 'currentPos',
              position: NodesJSON[i].position,
              hidden: false
            }
          );
        } else {
          nodes.push(
            {
              id: NodesJSON[i].id,
              type: 'position',
              position: NodesJSON[i].position,
              hidden: false
            }
          );
        }
      }
      
    }
  }
  console.log(nodes);
  return nodes;
}

export function hidePath(nodes){
  for (let i in nodes) {
    if(nodes[i]['id'][0] == "l"){
      if (nodes[i]['hidden'] == true){
        nodes[i]['hidden'] = false;
      } else {
        nodes[i]['hidden'] = true;
      }
    }
  }
  console.log(nodes)
  console.log("Hidden/Not hidden real paths!");
  return nodes;
}

// generateNodes();

// export function createNewNode(){
//   let nodes = [];
//   fetch(`./nodes.json`)
//   .then((res) => res.json())
//   .then((data) => {
//     // nodes.push(data);
//     console.log(data);
//   });
//   // return nodes;
// }

// function getData() {
//   var myRequest = new Request('newNode.txt');
//   fetch(myRequest, {mode: "no-cors"})
//   .then(function(response) {
//     if (!response.ok) {
//       throw new Error("HTTP error, status = " + response.status);
//     }
//     return response.text();
//   })
//   .then(function(text) {
//     console.log('START print:');
//     console.log(text);
//     return(text);
//   })
//   .catch(function(error) {
//       console.log('Error: ' + error.message)
//   });
  
// }


export default initialNodes;