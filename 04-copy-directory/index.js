const fs = require('fs').promises;
const path = require('path');

const folderPath = path.join(__dirname, 'files');
const copyFolderPath = path.join(__dirname, 'files-copy')

async function copyDir(dir, dirCopy) {
  try {
    await fs.mkdir(dirCopy, {recursive: true});
    const filesBefore = await fs.readdir(dir);

    for (const file of filesBefore) {
      const filePath = path.join(dir, file);
      const filePathCopy = path.join(dirCopy, file);
      const fileContent = await fs.readFile(filePath);

      await fs.writeFile(filePathCopy, fileContent);
    }
    const filesAfter = await fs.readdir(dirCopy);

    for(const file of filesAfter) {
      if(!filesBefore.includes(file)) {
        const filePathCopy = path.join(dirCopy, file);
        await fs.unlink(filePathCopy);
      }
    }
  } catch(error) {
    console.error(`${error.message}`);
  }
}
copyDir(folderPath, copyFolderPath)