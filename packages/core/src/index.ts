import path from 'path';
import { compilerCtrlToDsl, dslToJoi } from '@nxapi/nxapi';
import dslToKoa from '../../controller-dsl-koa/src';

const controllerPath = path.join('src', 'controllers');
const controllerDsls = compilerCtrlToDsl(controllerPath);
dslToJoi(controllerDsls, 'src/__tmp__');
dslToKoa(controllerDsls, 'src/__tmp__');
//todo 监听文件、koa中包含joi