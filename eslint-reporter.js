// eslint-reporter.js
const chalk = require('chalk');

module.exports = results => {
  let hasWarnings = false;
  let checkedFiles = 0;
  const successMessages = [];

  results.forEach(result => {
    checkedFiles++;
    if (result.messages.length > 0) {
      hasWarnings = true;
      console.log(chalk.red(`\nFile: ${result.filePath}`));
      result.messages.forEach(message => {
        console.log(
          `${chalk.yellow(`Line ${message.line}:${message.column}`)} ${chalk.red(
            message.message
          )} (${message.ruleId})`
        );
      });
    } else {
      console.log(chalk.green(`\nFile: ${result.filePath} - No issues found`));
      successMessages.push(`Checked: ${result.filePath}`);
    }
  });

  if (checkedFiles > 0 && !hasWarnings) {
    console.log(chalk.green('\nAll files passed linting successfully!'));
  }

  successMessages.forEach(msg => {
    console.log(chalk.green(msg));
  });
};
