const shell = require('shelljs');
const fs = require('fs');

const targetPath = './node_modules/@nxapi/kxapi/';
if (!fs.existsSync(targetPath)) fs.mkdirSync(targetPath);

shell.exec('npm run build');
shell.exec(`cp -r ./dist ${targetPath}`);
shell.exec(`cp -r package.json ${targetPath}package.json`);
shell.exec(`cp -r index.d.ts ${targetPath}index.d.ts`);
