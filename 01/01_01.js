const utils = require("../utils");

const prepareLists = data => {
  data = data.split("\n");
  const list1 = [];
  const list2 = [];
  data.forEach((element) => {
   const numbers = element.split(" ").filter(Boolean);
   if (numbers.length >1) {
     list1.push(parseInt(numbers[0].trim(), 10));
     list2.push(parseInt(numbers[1].trim(), 10));
   }  
  });
  list1.sort((a, b) => a - b);
  list2.sort((a, b) => a - b);
  return [list1, list2];
}

const calculateDistance = (list1, list2) => {
  const distances = [];
  for (let i = 0; i < list1.length; i++) {   
    if(list1[i] > list2[i]) {
     distances.push(list1[i] - list2[i]);
    } else if(list2[i] > list1[i]) {
      distances.push(list2[i] - list1[i]);
    } else if(list2[i] === list1[i]) {
      distances.push(0);
    }
  }
  return distances;
};

try {
  // let data = utils.readInput('./example.txt');
  let data = utils.readInput('./input.txt');
  const preparedLists = prepareLists(data);
  const distances = calculateDistance(preparedLists[0], preparedLists[1]);
  const sum = utils.calcArraySum(distances);
  console.log(sum);
  
} catch (e) {
  console.log("Error", e.stack);
}
