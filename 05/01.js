const utils = require("../utils");

const createMapFromData = (orderRules) => {

  const pageRuleMap = new Map();
  orderRules.forEach((rule) => {
    const ruleParts = rule.split("|");
    const page = parseInt(ruleParts[0], 10);
    const ruleValue = parseInt(ruleParts[1]);
    if(pageRuleMap.has(page)) {
      const ruleValues = pageRuleMap.get(page);
      ruleValues.push(ruleValue);
      pageRuleMap.set(page, ruleValues)
    } else {
        pageRuleMap.set(page, [ruleValue]);
      }
  });

  // console.log(pageRuleMap);
  return pageRuleMap;
}

const checkCorrectOrder = (pagesToPrint, rulesMap) => {
  //   47 => [ 53, 13, 61, 29 ],
  // page X must be printed before page Y
  const correctPrinterJobs = [];
  // for each printer job, check if the current page is in the correct order to be printed
  pagesToPrint.forEach((printerJob) => {
    // check for the current page, if the previous pages are not listed in the rules, then the order is correct
    let correctOrder = true;
    for(let i = printerJob.length - 1; i > 0; i--) {
      const currentPage = printerJob[i];
      for(let j = i - 1; j >= 0; j--) {
        const previousPage = printerJob[j];
        if(rulesMap.has(currentPage)) {
          const ruleValues = rulesMap.get(currentPage);
          if(ruleValues.includes(previousPage)) {
            //console.log("Page", currentPage, "must be printed before page", previousPage);
            correctOrder = false;
            break;
          }
        }
      }
    }
    if(correctOrder) {
      //console.log("Correct order for printer job", printerJob);
      correctPrinterJobs.push(printerJob);
    }
  });
  return correctPrinterJobs
}

const calculateResult = (correctPrinterJobs) => {
   // sum of the middle numbers of each correct printer job
    let sum = 0;
    correctPrinterJobs.forEach((printerJob) => {
      const middleIndex = Math.floor(printerJob.length / 2);
      //console.log(middleIndex);
      sum += printerJob[middleIndex];
    });
    console.log("Sum of middle numbers of each correct printer job", sum);
}

try {
  // let orderRules = utils.readInput('./example.txt');
  // let pagesToPrint = utils.readInput('./example_2.txt');
  let orderRules = utils.readInput('./page_order_rules.txt');
  let pagesToPrint = utils.readInput('./pages_to_print.txt');
  orderRules = utils.modDataNewlineStr(orderRules);
  rulesMap = createMapFromData(orderRules);
  pagesToPrint = utils.modDataNewlineStr(pagesToPrint);
  pagesToPrint = pagesToPrint.map(printerJob => utils.modDataCommas(printerJob));
  //console.log(pagesToPrint);
  const correctPrinterJobs = checkCorrectOrder(pagesToPrint, rulesMap);
  calculateResult(correctPrinterJobs);
} catch (e) {
  console.log("Error", e.stack);
}
