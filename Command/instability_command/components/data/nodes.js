import Nodes from './nodes.json';
import newNode from './newNode.txt';

var idCounter = 6;

const initialNodes = [
  {
    id: '1',
    type: 'position',
    data: { label: 'Origin'},
    position: { x: 250, y: 50 },
  },

  {
    id: '2',
    type: 'position',
    data: { label: '(100,50)'},
    position: { x: 100, y: 50 },
  },
  {
    id: '3',
    type: 'position',
    data: { label: '(250,120)'},
    position: { x: 250, y: 120 },
  },

  {
    id: '4',
    type: 'position',
    data: { label: '(250,-20)'},
    position: { x: 250, y: -20 },
  },
  {
    id: '5',
    type: 'position',
    data: { label: '(400,50)'},
    position: { x: 400, y: 50 },
  },

  {
    id: 'alien1',
    type: 'alien',
    data: { label: 'Alien(400,50)', safetyRadius: 100},
    position: { x: 400, y: 200 },
  },
];

///////////////////TRY1
//assume we receive the whole list of all past positions and aliens during every transmission
// for (let n of Nodes){
//   initialNodes.push(
//     {
//       id: n.id,
//       type: n.type,
//       data: n.data,
//       position: n.position
//     }
//   )
// }

////////////////////TRY2
// assume we only receive the next new position and add it to our existent list/database
// As with JSON, use the Fetch API & ES6
// fetch('./newNode.txt')
//   .then(response => response.text())
//   .then(data => {
//   	// Do something with your data
//   	var newN = {
//       id: idCounter.toString(),
//       type: 'position',
//       data: { label: data.toString()},
//       position: { x: data[0], y: data[1] },
//     };
//     initialNodes.push(newN);
//     idCounter++;
//   });

export default initialNodes;