const readline = require('readline');
const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function addNumbers(sum, numsLeft, completionCallback){
  if (numsLeft > 0){
    reader.question("Enter a number: ", (answer) => {
      sum += parseInt(answer);
      console.log(`The current sum is ${sum}.`);

      addNumbers(sum, numsLeft - 1, completionCallback);
    });
  } else if (numsLeft === 0){
    completionCallback(sum);
    reader.close();
  }
}

addNumbers(0, 3, sum => console.log(`Total Sum: ${sum}`));