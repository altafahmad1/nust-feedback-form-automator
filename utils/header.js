import chalk from 'chalk';
import pkgJson from './../package.json' assert { type: 'json' };

export default () => {
	console.log(
		chalk.bold.hex('#000000').bgYellow(pkgJson.name),
		`v${pkgJson.version} by ${pkgJson.author.name}`
	);
	console.log(pkgJson.description, '\n');
};
