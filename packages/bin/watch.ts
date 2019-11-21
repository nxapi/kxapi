import chokidar from 'chokidar';
import path from 'path';
import { servicePath } from './config';
import { Ast } from '@nxapi/nxapi';
import nxapiWatch from '@nxapi/nxapi/dist/bin/watch';
import build from './build';

const watch = () => {
  const watcher = chokidar.watch(path.join(process.cwd(), servicePath), { persistent: true, usePolling: true });
  // watcher.on('add', (path: string) => { console.log(path); });
  watcher.on('change', (path: string) => {
    if (!path.endsWith('.ts')) return;
    const ast = new Ast(path);
    if (!ast.isService()) return;
    build();
  });
  nxapiWatch();
  build();
};

export default watch;
