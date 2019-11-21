import path from 'path';

let kxapirc;
try {
  kxapirc = require(path.resolve(process.cwd(), '.kxapirc'));
} catch (e) {
  kxapirc = {};
}

export const rootDir = kxapirc.rootDir || 'src';
export const outputDir = kxapirc.outputDir || '__tmp__';
export const ctrlDir = kxapirc.ctrlDir || 'controllers';
export const serviceDir = kxapirc.serviceDir || 'services';
export const typeDir = kxapirc.typeDir || 'types';

export const outputPath = path.join(rootDir, outputDir);
export const servicePath = path.join(rootDir, serviceDir);

global['nxapirc'] = kxapirc;
