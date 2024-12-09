const utils = require("../utils");

const defragmentDiskmap = (diskMap) => {
  let fragmentPointer = 0;
  let defragmentPointer = diskMap.length - 1;
  while (fragmentPointer <=defragmentPointer){
    if(diskMap[fragmentPointer] === '.'){
      // swap
      let temp = diskMap[defragmentPointer];
      // swap only if not a '.'
      if(temp !== '.'){
        diskMap[fragmentPointer] = temp;
        diskMap[defragmentPointer] = '.';
        //console.log(defragmentPointer, diskMap);
        fragmentPointer++;
      }
      defragmentPointer--;
    } else {
      fragmentPointer++;
    }
  }
  diskMap.splice(defragmentPointer+1, diskMap.length - defragmentPointer);
 return diskMap;
}


const createDiskMap = (data) => {
  let diskMap = [];
  let diskIndex = 0;
  for (let i = 0; i < data.length; i++){
    if(i % 2 === 0){
      // even
      for(let j = 0; j < data[i]; j++){
        diskMap.push(diskIndex);
      }
      diskIndex++;
    } else {
      // odd
      for(let k = 0; k < data[i]; k++){
        diskMap.push('.');
      }
    }
  }
  return diskMap
}

const calculateCheckSum = (diskMap) => {
  let sum = 0;
  diskMap.forEach((element, index) => {
    if(typeof element === 'number'){
      sum += index * element;
    } else {
      console.log('not a number', element);
    }
  })
  console.log('sum', sum);
}

try {
 //let data = utils.readInput('./example.txt');
 let data = utils.readInput('./input.txt');
 data = utils.modStringIntoNumbers(data);
 const diskMap = createDiskMap(data);
 const defragmentedMap= defragmentDiskmap(diskMap);
 calculateCheckSum(defragmentedMap);
} catch (e) {
  console.log("Error", e.stack);
}
