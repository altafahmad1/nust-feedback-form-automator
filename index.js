#!/usr/bin/env node
import config from 'config';
import puppeteer from 'puppeteer';
import chalk from 'chalk';
import header from './utils/header.js';
import footer from './utils/footer.js';

const username = config.get('username');
const password = config.get('password');

(async () => {
	const getInputValue = (option) => {
		switch (option.toLowerCase()) {
			case 'excellent':
				return '3539787';
			case 'v good':
				return '3539788';
			case 'good':
				return '3539789';
			case 'avg':
				return '3539790';
			case 'poor':
				return '3539791';
			default:
				return '3539787';
		}
	};

	header();

	const getSize = function (obj) {
		var size = 0,
			key;
		for (key in obj) {
			if (obj.hasOwnProperty(key)) size++;
		}
		return size;
	};

	const opt = process.argv[2] || 'Excellent';
	const comments = process.argv[3] || 'Satsified.';
	console.log(`Provided Arguments: option: ${opt}`, `comment: ${comments}`);
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	await page.goto('https://qalam.nust.edu.pk/');
	await page.exposeFunction('getInputValueFromParam', getInputValue);

	await page.type('#login', username);
	await page.type('#password', password);
	await page.keyboard.press('Enter');

	await page.waitForNavigation();
	await page.goto('https://qalam.nust.edu.pk/student/qa/feedback', {
		waitUntil: 'load',
	});

	await page.screenshot({ path: `Form.png` });

	let forms = await page.evaluate(() =>
		Array.from(document.querySelectorAll('.md-list-addon-element'), (a) =>
			a.getAttribute('href')
		)
	);

	forms = forms.filter((href) => {
		if (href !== null && href.substring(0, 20) === '/student/evaluation/') {
			return href;
		}
	});

	console.log(forms);
	//Fill forms
	for (let i = 0; i < forms.length; i++) {
		console.log(`Form ${i + 1} of ${forms.length}`);
		await page.goto(`https://qalam.nust.edu.pk${forms[i]}`, {
			waitUntil: 'load',
		});

		let options = await page.evaluate(
			async (opt, comments) => {
				const options = document.querySelectorAll('input[type="range"]');
				if (options.length !== 0) {
					for (let i = 0; i < options.length; i++) {
						options[i].value = await window.getInputValueFromParam(opt);
					}

					let textArea = document.querySelector('textarea');
					textArea.value = comments;
					const submitButton = document.querySelector('button');
					submitButton.classList.remove('disabled');
				}
				return options;
			},
			opt,
			comments
		);

		if (getSize(options) !== 0) {
			await page.click('button[type="submit"]');
		}
	}

	console.log(
		'\n',
		chalk.blue(
			'nust-feedback-form-automator has filled the feedback forms for you. :)\n'
		)
	);

	await browser.close();

	footer();
})();
