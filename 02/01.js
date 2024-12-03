const utils = require("../utils");

const isDecreaseOrIncrease = (arr) => {
  let isDecrease = false;
  let isIncrease = false;

  for(let i = 0; i < arr.length; i++) {
    if (arr[i] > arr[i + 1]) {
      isDecrease = true;
    } else if(arr[i] < arr[i + 1]) {
      isIncrease = true;
    } else if(arr[i] === arr[i + 1]) {
      isDecrease = true;
      isIncrease = true;
    }
  }
  return [isDecrease, isIncrease];
}

const checkDistances = (arr, graduallyCheck) => {
  for(let i=0; i < arr.length; i++) {
    // distance when decreasing
    if(graduallyCheck[0]) {
      const distance = arr[i] - arr[i + 1];
      if(distance > 3) {
        i = arr.length;
        return 0
      }
    } if (graduallyCheck[1]) {
      const distance = arr[i + 1] - arr[i];
      if(distance > 3) {
        i = arr.length;
        return 0
      }
    }
  }
  return 1;
}

const safetyCheck = data =>{
  if (!data) {
    throw new Error("Data is undefined");
  }
  const isSafe = [];
  data.forEach(arr => {
   const graduallyCheck = isDecreaseOrIncrease(arr);
   if(graduallyCheck[0] && graduallyCheck[1]) {
    isSafe.push(0);
   } else {
    isSafe.push(checkDistances(arr, graduallyCheck));
   }
  });
  return isSafe;
}

try {
  // let data = utils.readInput('./example.txt');
  let data = utils.readInput('./input.txt');
  data = utils.modDataNewlineStr(data);
  data = utils.modDataBlanks(data);
  const isSafe = safetyCheck(data);
  console.log('isSafe', isSafe);
  console.log('sum', utils.calcArraySum(isSafe));
} catch (e) {
  console.log("Error", e.stack);
}
