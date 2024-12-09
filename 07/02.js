const { parse } = require("path");
const utils = require("../utils");

const probeOperations = (operands, result) => {
  const operations = ["+", "*", "||"];
  
  const evaluate = (index, currentResult) => {
    // when we reach the end of the operands array we check if the current result is equal to the expected result

    if (index === operands.length) {
      return currentResult === result;
    }

    // we iterate over the operations array and recursively call the evaluate function with the new result
    for (const op of operations) {
      let newResult;
      if (op === "+") {
        newResult = currentResult + operands[index];
      } else if (op === "*") {
        newResult = currentResult * operands[index];
      } else if(op === "||") {
        newResult =  newResult = parseInt('' + currentResult + operands[index], 10);
      }

      if (evaluate(index + 1, newResult)) {
        return true;
      }
    }

    return false;
  };

  return evaluate(1, operands[0]);
};

const findEquations = (data) => {
  const possibleEquationResults = [];
  let sum = 0;
  data.forEach((item) => {
    const equation = item.split(":");
    const result = parseInt(equation[0], 10);
    const operands = equation[1].trim().split(" ").map((item) => parseInt(item, 10));
    //console.log(result, operands);
    if (probeOperations(operands, result)) {
      possibleEquationResults.push(item);
      sum+= result;
    }    
  });
  //console.log(possibleEquationResults);
  console.log('result', sum);
}

try {
  // let data = utils.readInput('./example.txt');
  let data = utils.readInput('./input.txt');
  data = utils.modDataNewlineStr(data);
  findEquations(data);
} catch (e) {
  console.log("Error", e.stack);
}
