const fs = require('fs');
const path = require('path');
const pathToFile = path.join(__dirname,'text.txt');
const stream = fs.createReadStream(pathToFile, {encoding: 'utf-8'});
stream.on('data', (chunk) => {
  console.log(chunk);
});