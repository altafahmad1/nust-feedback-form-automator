# nust-feedbackform-automator

A CLI tool that helps in filling feedback forms with ease specially when you can't afford to spend your time filling feedback forms. However, if you really have something important to say, I strongly encourage you to fill your feedback forms manually. This tool just saves your time in case you have to fill all the feedback forms with a single option and a single word comment.

## Getting Started

### Prerequisites

Tools required:

- Nodejs

### Installing

- Create a folder named config and create a file default.json inside it. Write your username and password as follows in default.json file.

  > { <br>&nbsp;&nbsp;&nbsp;"username": "YOUR_CMS", <br>&nbsp;&nbsp;&nbsp;"password": "YOUR_PASSWORD" <br> }

- Install the required dependencies using:

  > npm install

- Run the application using:
  > node index.js [option] [comment]

### Usage

You have the option to select a choice of rating in the [option] parameter. In case the parameter is skipped "excellent" is chosen by default answer to all questions. The option parameter can take any of the following values:

- Excellent
- V Good
- Good
- Avg
- Poor

You can also choose a comment of yourself regarding all the feedback forms using [comment] parameter. The default is 'Satisfied.'
