#!/usr/bin/env node

var path = require('path');
var fs = require('fs');
/*eslint no-sync:0*/
var usage = fs.readFileSync(path.resolve(__dirname, '../usage.txt')).toString();
var args = require('minimist')(process.argv.slice(2), {
  boolean: ['debug', 'overwrite']
});

if (args.debug) {
  process.env.DEBUG = 'electron-installer-squirrel-windows';
}
var createInstaller = require('../');
var pkg = require('../package.json');

args.path = args._[0];

if (args.help || args.h || !args.path) {
  console.error(usage);
  process.exit(1);
}
if (args.version) {
  console.error(pkg.version);
  process.exit(1);
}

createInstaller(args, function(err) {
  if (err) {
    console.error(err);
    process.exit(1);
    return;
  }
  console.error('Wrote Setup.exe to:\n' + args.setup_path);
});
