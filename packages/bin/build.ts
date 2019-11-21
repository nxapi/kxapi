import fs from 'fs';
import path from 'path';
import { servicePath, rootDir, typeDir, outputDir } from './config';
import { Ast } from '@nxapi/nxapi';
import nxapiBuild from '@nxapi/nxapi/dist/bin/build';

const serviceFullPath = path.join(process.cwd(), servicePath);
const rootFullPath = path.join(process.cwd(), rootDir);
const outputFullPath = path.join(process.cwd(), rootDir, outputDir);

if (!fs.existsSync(rootFullPath)) fs.mkdirSync(rootFullPath);
if (!fs.existsSync(outputFullPath)) fs.mkdirSync(outputFullPath);

const fileNameToClassName = (fileName: string) => {
  const littleNames = fileName.split('-');
  let className = '';
  for (let i = 0; i < littleNames.length; ++i) {
    let name = littleNames[i];
    name = name.replace(name[0], name[0].toUpperCase());
    className += name;
  }
  return className;
};

const reWriteFile = (fullPath: string, content: string) => {
  if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
  fs.writeFileSync(fullPath, content);
};

let imports = '';
let classNameList: any[] = [];
const extract = (dirPath: string) => {
  const pa = fs.readdirSync(dirPath);
  pa.forEach((ele, index) => {
    const tmpPath = dirPath + '/' + ele;
    const info = fs.statSync(tmpPath);
    if (info.isDirectory()) {
      extract(tmpPath);
    } else {
      if (!ele.endsWith('.ts')) return;
      const ast = new Ast(tmpPath);
      if (!ast.isService()) return;
      const relativePath = dirPath.replace(rootFullPath, '');
      const fileName = ele.replace('.ts', '');
      const className = fileNameToClassName(fileName);
      classNameList.push(className);
      imports += `import ${className} from '..${relativePath}/${fileName}';\n`;
    }
  });
};

const buildServiceTypeFile = (classTypes: string) => {
  const content = `${imports}
declare module '@nxapi/kxapi' {
  export interface IService {
${classTypes}
  }
}`;
  reWriteFile(path.join(process.cwd(), rootDir, typeDir, 'service.d.ts'), content);
};

const buildServiceClassFile = (newClasss: string, initClasss: string) => {
  const content = `${imports}
export default class Service {
  readonly ctx: any = {};
  setFields(params: any) {
    Object.assign(this.ctx, params.ctx || {});

  }
${newClasss}
  constructor() {
${initClasss}
  }
}`;
  reWriteFile(path.join(process.cwd(), rootDir, outputDir, 'service.ts'), content);
};

const build = () => {
  imports = '';
  classNameList = [];
  extract(serviceFullPath);
  let initClasss = '';
  let classTypes = '';
  let newClasss = '';
  classNameList.forEach(name => {
    const className = name;
    name = name.replace(name[0], name[0].toLowerCase());
    newClasss += `  ${name}:${className} = new ${className}();\n`;
    initClasss += `    this.${name}.service = this;\n`;
    initClasss += `    this.${name}.ctx = this.ctx;\n`;
    classTypes += `    ${name}: ${className};\n`;
  });
  buildServiceTypeFile(classTypes);
  buildServiceClassFile(newClasss, initClasss);
  console.log('kxapi service success!');
  nxapiBuild();
};

export default build;
