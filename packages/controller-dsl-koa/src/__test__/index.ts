import dslToKoa from '..';
import path from 'path';
import { compilerCtrlToDsl } from '@nxapi/nxapi';

const nxapiDslToKoa = require('@nxapi/nxapi-dsl-koa');

console.log(nxapiDslToKoa);

const controllerPath = path.join('src', 'controllers');
const controllerDsls = compilerCtrlToDsl(controllerPath);

dslToKoa(controllerDsls, 'src/__tmp__');
