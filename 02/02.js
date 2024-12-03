const utils = require("../utils");

const isStrictlyIncreasingOrDecreasing = (arr) => {
  let isDecreasing = arr[0] > arr[1];
  let hasSwitchpoint = false;

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] === arr[i + 1]) {
      hasSwitchpoint = true;
      break;
    } else if (isDecreasing && arr[i] < arr[i + 1]) {
      hasSwitchpoint = true;
      break;
    } else if (!isDecreasing && arr[i] > arr[i + 1]) {
      hasSwitchpoint = true;
      break;
    }
  }
  return hasSwitchpoint;
}

const checkDistances = (arr) => {
  for (let i = 0; i < arr.length - 1; i++) {
    const distance = Math.abs(arr[i] - arr[i + 1]);
    if (distance > 3 || distance === 0) {
      return false;
    }
  }
  return true;
}

const safetyCheck = (data) => {
  let isSafe = [];
  let safeSum = 0;
  data.forEach((arr, index) => {
    let hasSwitchpoint = isStrictlyIncreasingOrDecreasing(arr);

    if (hasSwitchpoint || !checkDistances(arr)) {
      let safe = false;
      for (let i = 0; i < arr.length; i++) {
        let arrCopy = arr.slice();
        arrCopy.splice(i, 1);
        //console.log(arrCopy);
        hasSwitchpoint = isStrictlyIncreasingOrDecreasing(arrCopy);
        if (!hasSwitchpoint && checkDistances(arrCopy)) {
          //console.log('safe array variant', arrCopy)
          safe = true;
          break;
        }
      }
      if (safe) {
        isSafe.push({ index, safe: true});
        safeSum++;
      } else {
        isSafe.push({ index, safe: false, reason: 'Switch point or distance issue after removal', arr: arr });
      }
    } else {
      isSafe.push({ index, safe: true, arr: arr });
      safeSum++;
    }
  });
  return [isSafe, safeSum];
}
try {
  // let data = utils.readInput('./example.txt');
  let data = utils.readInput('./input.txt');
  data = utils.modDataNewlineStr(data);
  data = utils.modDataBlanks(data);
  const [isSafe, safeSum] = safetyCheck(data);
  //console.log('isSafe', isSafe);
  console.log('sum', safeSum);
} catch (e) {
  console.log("Error", e.stack);
}
