#!/usr/bin/env node --harmony
'use strict';
// 定义脚手架的文件路径
process.env.NODE_PATH = __dirname + '/../node_modules/';

const program = require('commander');

program
  .version('1.0.0', '-v, --version');

program.on('--help', function(){
  console.log('');
  console.log('  Examples:');
  console.log('');
  console.log('    $ creat-h5-react init');
  console.log('    $ creat-h5-react i');
  console.log('');
});

program
  .command('init')
  .description('Generate a new project')
  .alias('i')
  .action(() => {
    require('../src/init/index')()
  });

program.parse(process.argv);

if(!program.args.length){
  program.help()
}
