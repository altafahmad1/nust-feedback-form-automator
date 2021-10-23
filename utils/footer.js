const chalk = require('chalk');
const clitable = require('cli-table');
const pkgJson = require('./../package.json');

module.exports = () => {
  const table = new clitable();

  table.push(
    ['Github', `${pkgJson.author.github}`],
    ['Website', `${pkgJson.author.url}`]
  );

  console.log(table.toString());
};
