
import path from 'path';
import fs from 'fs';
import IRoute, { extractRoutes } from './route';
import { DSLController } from '@nxapi/nxapi';

const getReqData = (httpMethod: string) => {
  if (httpMethod === 'get') {
    return 'ctx.request.query';
  } else if (httpMethod === 'post' || httpMethod === 'put' || httpMethod === 'delete') {
    return 'ctx.request.body';
  }
};

const firstLowerCase = (name: string) => {
  return name.replace(name[0], name[0].toLowerCase());
};

const convertToKoa = (controllerDsls: DSLController[], routes: IRoute[]) => {
  let imports = '';
  let newClasss = '';
  controllerDsls.forEach(ctrl => {
    const relativePath = ctrl.fileFullPath.replace(path.join(process.cwd(), 'src'), '').replace('.ts', '');
    imports += `import ${ctrl.className} from '..${relativePath}';\n`;
    const insClassName = firstLowerCase(ctrl.className);
    newClasss += `const ${insClassName} = new ${ctrl.className}();\n`;
  });
  let interfaces = '';
  routes.forEach(route => {
    const insClassName = firstLowerCase(route.className);
    interfaces += `
  router.${route.httpMethod}('${route.path}', async (ctx, next) => {
    ctx.body = ${insClassName}.${route.classMethodName}(${getReqData(route.httpMethod)});
    await next();
  });
  `;
  });
  interfaces = `
module.exports = (router) => {
${interfaces}
}
`;
  const output = imports + newClasss + interfaces;
  return output;
};

const saveKoa = (content: string, savePath: string) => {
  const targetPath = path.resolve(process.cwd(), savePath);
  const exists = fs.existsSync(targetPath);
  if (!exists) {
    fs.mkdirSync(targetPath);
  }
  fs.writeFileSync(path.resolve(targetPath, 'routes.js'), content, 'utf8');
};
export default (controllerDsls: DSLController[], tmpRelativePath: string) => {
  const routes = extractRoutes(controllerDsls);
  const output = convertToKoa(controllerDsls, routes);
  saveKoa(output, tmpRelativePath);
};
// export default (rootRelativePath: string, controllerRelativePath: string, tmpRelativePath: string) => {
//   const controllerPath = path.join(rootRelativePath, controllerRelativePath);
//   const tmpPath = path.join(rootRelativePath, tmpRelativePath);
//   const controllerDsls = compiler(controllerPath);
//   const routes = extractRoutes(controllerDsls);
//   const output = convertToKoa(controllerDsls, routes);
//   saveKoa(output, tmpPath);
// };
