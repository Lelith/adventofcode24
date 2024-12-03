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
  return [list1, list2];
}

const calculdateSimilarityScrole = (list1, list2) => {
  const similarity = [];
  // counts the number of appearances of each number from list1 in list2
  list1.forEach((element) => {
    count = 0;
    list2.forEach((item) => {
      if (element === item) {
        count ++;
      }
    });
    similarity.push(element * count);
  });
  return similarity;
};

try {
  // let data = utils.readInput('./example.txt');
  let data = utils.readInput('./input.txt');
  const preparedLists = prepareLists(data);
  const similarities = calculdateSimilarityScrole(preparedLists[0], preparedLists[1]);
  const sum = utils.calcArraySum(similarities);
  console.log('sum',sum);
} catch (e) {
  console.log("Error", e.stack);
}
