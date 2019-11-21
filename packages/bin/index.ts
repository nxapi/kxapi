#!/usr/bin/env node
import build from './build';
import watch from './watch';
const program = require('commander');
const { version } = require('../../package.json');

program.version(version).usage('<command> [options]');

program
  .command('watch')
  .description('watch controller')
  .action(async () => {
    watch();
  });

program
  .command('build')
  .description('build controller')
  .action(async () => {
    build();
  });

program.arguments('<command>').action(() => {
  program.outputHelp();
});

program.parse(process.argv);
