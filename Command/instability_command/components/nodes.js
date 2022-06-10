// import NodesJSON from '../../data/nodes.json';
// import currentNode from '../../data/currentNode.json';

import { useCallback, useState, useRef, useEffect } from 'react';

// console.log(NodesJSON);

let initialNodes = [
  {
    id: 'p0',
    type: 'currentPos',
    position: { x: 0, y: 0 },
    hidden: false,
  },
];

// console.log(initialNodes);
// let nodes = initialNodes;
var myRequest = new Request('https://localhost:8000/nodes');
var myRequestCurrentNode = new Request('https://localhost:8000/currentNode');

export const getNodes = (nodes) => {
  var currentNode = {}
  // var nodes = initialNodes;
    fetch(myRequestCurrentNode)
      .then(function (response) {
        if (!response.ok) {
          throw new Error("HTTPS error, status = " + response.status);
        }
        return response.json();
      })
      .then(function (json) {
        currentNode = json; 
        return
      })
      .catch(function (error) {
        console.log('Error currentNODE: ' + error.message)
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
      nodes = generateNodes(json, currentNode, nodes); 
      // console.log("GENERATED NODES:", nodes);
      return
      // return (json);
    })
    .catch(function (error) {
      console.log('Error NODES: ' + error.message)
    })

    return nodes;
};

export function generateNodes(NodesJSON, currentNode, nodes){
  //nodes are being added multiple times...must check if they exists in order to not add them again
  //code updates everytime we change the code...so should put the map as first/main page so it refreshes on it
  for (let i in NodesJSON) {
      if(NodesJSON[i].id[0] == "a"){
        nodes.push(
          {
            id: NodesJSON[i].id,
            type: 'alien',
            position: NodesJSON[i].position,
            hidden: false
          }
        );
      }
      else if(NodesJSON[i].id[0] == "l"){
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
        console.log(currentNode, currentNode.id, NodesJSON[i].id)
        //if(NodesJSON[i].id[0] == "p")
        if(currentNode.id == NodesJSON[i].id) { 
          //should check the postion too to make sure that it has the same coords or to add a new node
          // console.log("create as current node")
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
  // console.log("GENERATE NODES:", nodes);
  return nodes;
}

export function hidePath(all_nodes){
  for (let i in all_nodes) {
    if(all_nodes[i]['id'][0] == "l"){
      if (all_nodes[i]['hidden'] == true){
        all_nodes[i]['hidden'] = false;
      } else {
        all_nodes[i]['hidden'] = true;
      }
    }
  }
  // console.log(all_nodes)
  console.log("Hidden/Not hidden real paths!");
  return all_nodes;
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
//   var myRequest = new Request('newNode.txt'); //must be external url
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