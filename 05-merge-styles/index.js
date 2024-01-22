const fs = require('fs').promises;
const path = require('path');

const stylesPath = path.join(__dirname, 'styles');
const projectPath = path.join(__dirname, 'project-dist');
const bundlePath = path.join(projectPath, 'bundle.css');

async function mergeStyles() {
  try {
    const files = await fs.readdir(stylesPath);
    const cssFiles = files.filter(file => path.extname(file).toLocaleLowerCase() === '.css');
    const stylesFinal = [];

    for(const file of cssFiles) {
      const filePath = path.join(stylesPath, file);
      const fileContent = await fs.readFile(filePath, {encoding: 'utf-8'});
      stylesFinal.push(fileContent);
    }
    await fs.writeFile(bundlePath, stylesFinal.join('\n'));
  } catch(error) {
    console.error(`${error.message}`);
  }
}
mergeStyles();