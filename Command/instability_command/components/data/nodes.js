import Nodes from './nodes.json';

// console.log(Nodes);

let initialNodes = [
  {
    id: '1',
    type: 'position',
    data: { label: 'Origin'},
    position: { x: 250, y: 50 },
  },

  // {
  //   id: '2',
  //   type: 'position',
  //   data: { label: '(100,50)'},
  //   position: { x: 100, y: 50 },
  // },
  // {
  //   id: '3',
  //   type: 'position',
  //   data: { label: '(250,120)'},
  //   position: { x: 250, y: 120 },
  // },

  // {
  //   id: '4',
  //   type: 'position',
  //   data: { label: '(250,-20)'},
  //   position: { x: 250, y: -20 },
  // },
  // {
  //   id: '5',
  //   type: 'position',
  //   data: { label: '(400,50)'},
  //   position: { x: 400, y: 50 },
  // },

  // {
  //   id: 'alien1',
  //   type: 'alien',
  //   data: { label: 'Alien(400,50)', safetyRadius: 100},
  //   position: { x: 400, y: 200 },
  // },
];

console.log(Nodes);

export function generateNodes(){
  let nodes = [];
  for (let i in Nodes) {
    nodes.push(
      {
        id: Nodes[i].id,
        type: 'position',
        position: Nodes[i].position
      }
    )
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