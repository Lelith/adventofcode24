const { captureRejections } = require("stream");
const utils = require("../utils");

const directions = {
  'U': [-1, 0], // up --> right
  'D': [1, 0], // down --> left
  'R': [0, 1], // right --> down
  'L': [0, -1] // left --> up
}

const changeDirection = (currentDirection) => {
  let directions = ['U', 'R', 'D', 'L'];
  let currentDirectionIndex = directions.indexOf(currentDirection);
  let nextDirectionIndex = (currentDirectionIndex + 1) % directions.length;
  //console.log('new direction', directions[nextDirectionIndex]);
  return directions[nextDirectionIndex];
}

const followGuard = (data) => {
  let currentRow = 89;
  let currentColumn = 74;
  let currentDirection = 'U'; // up

  while(currentRow >= 0 && currentRow < data.length - 1 && currentColumn >= 0 && currentColumn < data[currentRow].length
  ) { 
    data[currentRow][currentColumn] = 'X';
    let [dRow, dCol] = directions[currentDirection];
    
    const nextRow = currentRow + dRow;
    const nextColumn =  currentColumn + dCol;

    if(data[nextRow][nextColumn] === '#') {
      //console.log("Hit a obstacle, change direction");
      currentDirection = changeDirection(currentDirection);
    } else {
      currentRow = nextRow;
      currentColumn = nextColumn;
    }
  }

  return data;
}

const countDistinctSteps = (data) => {
  let steps = 1;
  data.forEach(row => {
    row.forEach(column => {
      if(column === 'X') {
        steps++;
      }
    });
  });

  console.log('distinct steps', steps);
}

try {
  // let data = utils.readInput('./example.txt');
  let data = utils.readInput('./input.txt');
  data = utils.modDataNewlineStr(data);
  data = data.map(item => item.split(""));
  data = followGuard(data);
  countDistinctSteps(data);
} catch (e) {
  console.log("Error", e.stack);
}
