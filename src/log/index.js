'use strict';
const gradient = require('gradient-string');
const figlet = require('figlet');

const logo = () => new Promise((resolve,reject)=>{
  figlet.text('H5DS',{
    font:'Standard',
    kerning: 'full',
  }, function (err, data) {
    if (err) {
      console.log('Something went wrong...');
      reject(false);
      return;
    }
    console.log(gradient.pastel.multiline(data) + '\n');
    console.log(gradient.atlas('  快速搭建一个react环境！') + '\n');
    resolve(true)
  });
});

module.exports = logo;