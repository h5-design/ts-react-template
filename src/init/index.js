'use strict';
const exec = require('child_process').exec;
const co = require('co');
const chalk = require('chalk');
const inquirer = require('inquirer');
const logo = require('../log/index.js');
const deleteFolderRecursive = require('../utils/deleteFolder');

module.exports = () => {
  co(function *() {
    //设置写入的字体
    let boolean = logo();
    if (yield boolean) {
      const choicesarr = [
        'react-js版',
        'react-ts版',
        'react-ts-router版',
        'react-ts-router-antd版'
      ];
      //选择自己的模板 ;
      const firstQuestion = {
        type: 'list',
        message: '请选择你需要的环境',
        name: 'line',
        choices: choicesarr,
      };

      const secondQuestion = {
        type: 'input',
        name: 'projectName',
        message: "项目名称"
      };

      inquirer.prompt([
        firstQuestion,
        secondQuestion
      ]).then(function (answers) {
        let branch = '';
        const projectName = answers.projectName || 'react-template';
        let gitUrl = 'https://github.com/h5-design/ts-react-template.git';
        if (answers.line === 'react-js版') {
          branch = 'origin/feature/js'
        } else if (answers.line === 'react-ts版') {
          branch = 'origin/feature/ts-clear'
        } else if (answers.line === 'react-ts-router版'){
          branch = 'origin/feature/ts-router'
        } else {
          branch = 'origin/feature/ts-router-antd'
        }
        let boolean = true;
        //加载中
        if (boolean) {
          console.log('\n 初始化中...');
          boolean = false;
        }
        const clone =  exec(`git clone --progress ${gitUrl} ${projectName}`,(error, stdout, stderr)=>{
          if (error) {
            console.log(error);
            process.exit()
          }
          exec(`cd ${projectName} && git checkout ${branch}`, (error2, stdout2, stderr2) => {
            if (error2) {
              console.log(error2);
              process.exit()
            }
            console.log(chalk.green('\n √ 初始化成功!'));
            console.log(`\n cd ${projectName} && npm install && npm start \n`);
            deleteFolderRecursive(process.cwd()+`/${projectName}/.git`);
            process.exit()
          })
        });

        clone.stderr.on('data', function(data){
          if (data.indexOf('Receiving objects') >= 0){
            console.log(chalk.yellow(`\n The current progress is'${data.replace('Receiving objects','')}`));
          }
        });
      })
    }
  })
};