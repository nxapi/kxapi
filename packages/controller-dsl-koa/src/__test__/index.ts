import dslToKoa from '..';
import path from 'path';
import { compilerCtrlToDsl } from '@nxapi/nxapi';

const controllerPath = path.join('src', 'controllers');
const controllerDsls = compilerCtrlToDsl(controllerPath);

dslToKoa(controllerDsls, 'src/__tmp__');
