const fs = require('fs').promises;
const path = require('path');

const componentsPath = path.join(__dirname, 'components');
const assetsPath = path.join(__dirname, 'assets');
const projectPath = path.join(__dirname, 'project-dist');
const stylesPath = path.join(__dirname, 'styles');
const bundlePath = path.join(projectPath, 'style.css');
const indexPath = path.join(projectPath, 'index.html');
const templatePath = path.join(__dirname, 'template.html');

async function copyDir(dir, dirCopy) {
  try {
    await fs.mkdir(dirCopy, { recursive: true });
    const filesBefore = await fs.readdir(dir);

    for (const file of filesBefore) {
      const filePath = path.join(dir, file);
      const filePathCopy = path.join(dirCopy, file);
      const stats = await fs.stat(filePath);

      if (stats.isDirectory()) {
        await copyDir(filePath, filePathCopy);
      } else {
        const fileContent = await fs.readFile(filePath);
        await fs.writeFile(filePathCopy, fileContent);
      }
    }
  } catch (error) {
    console.error(`${error.message}`);
  }
}

async function mergeStyles() {
  try {
    const files = await fs.readdir(stylesPath);
    const cssFiles = files.filter(file => path.extname(file).toLocaleLowerCase() === '.css');
    const stylesFinal = [];

    for (const file of cssFiles) {
      const filePath = path.join(stylesPath, file);
      const fileContent = await fs.readFile(filePath, { encoding: 'utf-8' });
      stylesFinal.push(fileContent);
    }

    await fs.writeFile(bundlePath, stylesFinal.join('\n'));
  } catch (error) {
    console.error(`${error.message}`);
  }
}

async function replaceTagsInTemplate(template, components) {
  try {
    let templateContent = await fs.readFile(template, { encoding: 'utf-8' });

    for (const component of components) {
      const componentName = path.parse(component).name;
      const regex = new RegExp(`{{${componentName}}}`, 'g');
      const componentContent = await fs.readFile(path.join(componentsPath, component), { encoding: 'utf-8' });
      templateContent = templateContent.replace(regex, componentContent);
    }

    return templateContent;
  } catch (error) {
    console.error(`${error.message}`);
  }
}

async function buildPage() {
  try {
    await copyDir(assetsPath, path.join(projectPath, 'assets'));
    await mergeStyles();

    const components = await fs.readdir(componentsPath);
    const templateContent = await replaceTagsInTemplate(templatePath, components);

    await fs.writeFile(indexPath, templateContent);

  } catch (error) {
    console.error(`${error.message}`);
  }
}
buildPage();