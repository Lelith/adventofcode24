const utils = require("../utils");

const findInstructions = (data) => {
  let instructions = [];
  const regex = /mul\((\d+),(\d+)\)|don't\(\)|do\(\)/g;
  let ignore = false;
  
  while ((matches = regex.exec(data)) !== null) {
    if (matches[0] === "don't()") {
      ignore = true;
    } else if (matches[0] === "do()") {
      ignore = false;
    } else if (!ignore) {
      const x = parseInt(matches[1], 10);
      const y = parseInt(matches[2], 10);
      instructions.push({ x, y });
    }
  }
  return instructions;
}

const calculateResult = (instructions) => {
  let result = 0;
  instructions.forEach((instruction) => {
    result += instruction.x * instruction.y;
  });
  return result;
}

try {
  // let data = utils.readInput('./example.txt');
  let data = utils.readInput('./input.txt');
  const instructions = findInstructions(data);
  const result = calculateResult(instructions);
  console.log(result);
} catch (e) {
  console.log("Error", e.stack);
}
