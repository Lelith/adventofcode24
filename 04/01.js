const utils = require("../utils");

const moveIntoDirection = (data, currentRow, currentCol, direction) => {  
  
  // follow the direction to find the letters A and S
  switch(direction) {
    case 'right':
      if(currentCol+2 < data[currentRow].length) {
        if(data[currentRow][currentCol+1] == "A" && data[currentRow][currentCol+2] == "S"){
            return true;
          }
        }
    
      break;
    case 'down': 
      if(currentRow+2 < data.length) {
        if(data[currentRow+1][currentCol] == "A"){
          if(data[currentRow+2][currentCol] == "S"){
            return true;
          }
        }
      }
      break;
    case 'left':  
    if(currentCol-2 >= 0) {
      if(data[currentRow][currentCol-1] == "A"){
        if(data[currentRow][currentCol-2] == "S"){
          return true;
        }
      }
    }
      break;
    case 'up':
      if(currentRow-2 >= 0) {
      if(data[currentRow-1][currentCol] == "A"){
        if(data[currentRow-2][currentCol] == "S"){
          return true;
        }
      }
    }
      break;
    case 'downright':
      if(currentRow+2 < data.length && currentCol+2 < data[currentRow].length) {
        if(data[currentRow+1][currentCol+1] == "A"){
          if(data[currentRow+2][currentCol+2] == "S"){
            return true;
          }
        }
      }
      break;
    case 'upleft':
      if(currentRow-2 >= 0 && currentCol-2 >= 0) {
        if(data[currentRow-1][currentCol-1] == "A"){
          if(data[currentRow-2][currentCol-2] == "S"){
            return true;
          }
        }
      }
      break;
    case 'downleft':
      if(currentRow+2 < data.length && currentCol-2 >= 0) {
        if(data[currentRow+1][currentCol-1] == "A"){
          if(data[currentRow+2][currentCol-2] == "S"){
            return true;
          }
        }
      }
      break;
    case 'upright':
      if(currentRow-2 >= 0 && currentCol+2 < data[currentRow].length) {
        if(data[currentRow-1][currentCol+1] == "A"){
          if(data[currentRow-2][currentCol+2] == "S"){
            return true;
          }
        }
      }
      break;
    default:
      break;
  }
  return false;
}

const getPhraseDirection = (data, currentRow, currentCol) => {
    const directions = [
    [currentRow, currentCol+1, 'right'], // right
    [currentRow+1, currentCol, 'down'], // down
    [currentRow, currentCol-1, 'left'], // left
    [currentRow-1, currentCol, 'up'], // up
    [currentRow+1, currentCol+1, 'downright'], // down right
    [currentRow-1, currentCol-1, 'upleft'], // up left
    [currentRow+1, currentCol-1, 'downleft'], // down left
    [currentRow-1, currentCol+1, 'upright'], // up right
  ];

  let foundPhrases = 0;
  // look in all directions for next letter 'M'
  for(let i = 0; i < directions.length; i++) {
    const [newRow, newCol] = directions[i];
    if(newRow >= 0 && newRow < data.length && newCol >= 0 && newCol < data[newRow].length) {
      // if neighbour is letter 'M' then move into that direction
      if(data[newRow][newCol] === "M") {
        const result = moveIntoDirection(data, newRow, newCol, directions[i][2]);
        if(result) {
         // console.log('Found phrase in direction', directions[i][2]);
          foundPhrases++;
        }
      }
    }
  }
  //console.log('Found phrases:', foundPhrases);
  return foundPhrases;
};

const findPhrase = (data) => {
  let foundPhrases = 0;

  for(let rowIndex = 0; rowIndex < data.length; rowIndex++) {
    for(let colIndex = 0; colIndex < data[rowIndex].length; colIndex++) {
      const currentLetter = data[rowIndex][colIndex];
      //console.log('Current letter:', currentLetter);
      if(currentLetter === "X") {
        //console.log('Found letter X at:', rowIndex, colIndex);
        // get direction of phrase
        const result = getPhraseDirection(data, rowIndex, colIndex);
        //console.log(result);
        foundPhrases += result;
      }
    }
  }
  console.log('Found phrases:', foundPhrases);
};

try {
  // let data = utils.readInput('./example.txt');
  let data = utils.readInput('./input.txt');
  data = utils.modDataNewlineStr(data);
  data = data.map(item => item.split(""));
  findPhrase(data);
} catch (e) {
  console.log("Error", e.stack);
}
