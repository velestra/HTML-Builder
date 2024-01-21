const fs = require('fs');
const path = require('path');
const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, (err, files) => {
  if(files) {
    files.forEach((file) => {
      const filePath = path.join(folderPath, file);

      fs.stat(filePath, (err, stats) => {
        if(stats && stats.isFile()) {
          console.log(`${path.parse(file).name} - ${path.parse(file).ext.slice(1)} - ${stats.size} bytes`);
        }
      });
    });
  }
});