#!/usr/bin/env node
const config = require('config');
const puppeteer = require('puppeteer');
const username = config.get('username');
const password = config.get('password');
const chalk = require('chalk');
const header = require('./utils/header');
const footer = require('./utils/footer');

(async () => {
  header();

  const getSize = function (obj) {
    var size = 0,
      key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };

  const opt = process.argv[2] || '0';
  const comments = process.argv[3] || '.';
  console.log(opt, comments);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://qalam.nust.edu.pk/');

  await page.type('#login', username);
  await page.type('#password', password);
  await page.keyboard.press('Enter');

  await page.waitForNavigation();
  await page.goto('https://qalam.nust.edu.pk/student/qa/feedback');

  await page.screenshot({ path: `Form.png` });

  let forms = await page.evaluate(() =>
    Array.from(document.querySelectorAll('.md-list-addon-element'), (a) =>
      a.getAttribute('href')
    )
  );

  forms = forms.filter((href) => {
    if (href !== null && href.substr(0, 13) === '/survey/fill/') {
      return href;
    }
  });

  //Fill forms
  for (let i = 0; i < forms.length; i++) {
    console.log(`Form ${i + 1} of ${forms.length}`);
    await page.goto(`https://qalam.nust.edu.pk${forms[i]}`);

    let options = await page.evaluate(
      (opt, comments) => {
        const options = document.querySelectorAll('input[type="radio"]');
        if (options.length !== 0) {
          for (let i = parseInt(opt); i < options.length; i = i + 5) {
            options[i].click();
          }

          let textArea = document.querySelector('textarea');
          textArea.value = comments;
        }
        return options;
      },
      opt,
      comments
    );

    if (getSize(options) !== 0) {
      await page.click('button[name="button_submit"]');
    }

    // if (optionLength.length !== 0) {
    //   await page.pdf({ path: `Form ${i + 1}.pdf`, format: 'a4' });
    // }
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
