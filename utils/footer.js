import clitable from 'cli-table';
import pkgJson from './../package.json' assert { type: 'json' };

export default () => {
	const table = new clitable();

	table.push(
		['Github', `${pkgJson.author.github}`],
		['Website', `${pkgJson.author.url}`]
	);

	console.log(table.toString());
};
