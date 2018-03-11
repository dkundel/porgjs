#! /usr/bin/env node
const optimist = require('optimist');
const { spawn } = require('child_process');
const { getPorgStream } = require('./lib/porgStream');
const { Porg } = require('./lib/porg');

const { e: command } = optimist
  .usage(`Usage: $0 -e '[cmd]'`)
  .demand(['e']).argv;

const child = spawn(command, [], { shell: true });

child.stderr.pipe(getPorgStream()).pipe(process.stderr);
child.stdout.pipe(process.stdout);

child.on('close', code => {
  if (code !== 0) {
    Porg.shared().scream();
  }
  Porg.shared().finish(code);
});
