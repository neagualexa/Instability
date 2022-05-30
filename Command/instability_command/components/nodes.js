import NodesJSON from './data/nodes.json';
import currentNode from './data/currentNode.json';

// console.log(NodesJSON);

let initialNodes = [
  {
    id: 'p00',
    type: 'position',
    position: { x: 190, y: 240 },
  },
];

console.log(initialNodes);
let nodes = initialNodes;

export function generateNodes(){
  //nodes are being added multiple times...must check if they exists in order to not add them again
  //code updates everytime we change the code...so should put the map as first/main page so it refreshes on it
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
      if(NodesJSON[i].id[0] == "a"){
        nodes.push(
          {
            id: NodesJSON[i].id,
            type: 'alien',
            position: NodesJSON[i].position
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
              position: NodesJSON[i].position
            }
          );
        } else {
          nodes.push(
            {
              id: NodesJSON[i].id,
              type: 'position',
              position: NodesJSON[i].position
            }
          );
        }
      }
      
    }
  }
  console.log(nodes);
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