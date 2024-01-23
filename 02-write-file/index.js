const fs = require('fs');
const readline = require('readline');
const path = require('path');

const filePath = path.join(__dirname, 'output.txt');
const writeFile = fs.createWriteStream(filePath, {encoding: 'utf-8', flags: 'a'});

console.log('Welcome! Input your text. For exit input "exit"');

const rl = readline.createInterface ({
  input: process.stdin,
  output: process.stdout
});
function manageInput(input) {
  if(input.trim().toLowerCase() === 'exit') {
    console.log('Goodbye!');
    process.exit();
  }
  writeFile.write(`${input}\n`);
  rl.question('', manageInput);
}

rl.question('', manageInput);

process.on('SIGINT', () => {
  console.log('Goodbye!');
  writeFile.end();
  process.exit();
});