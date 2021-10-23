const chalk = require('chalk');
const pkgJson = require('./../package.json');

module.exports = () => {
  console.log(
    chalk.bold.hex('#000000').bgYellow(pkgJson.name),
    `v${pkgJson.version} by ${pkgJson.author.name}`
  );
  console.log(pkgJson.description, '\n');
};
