import { Command } from 'commander';
import genDiff from './index.js';
import stylish from '../formatters/stylish.js';
import plain from '../formatters/plain.js';

const program = new Command();

program
  .version('0.0.1', '-V, --version', 'output the version number')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', stylish)
  .action((filepath1, filepath2, options) => {
    const fileDiff = genDiff(filepath1, filepath2);
    const plainDiff = genDiff(filepath1, filepath2, plain);
    if (options.format === undefined) {
      console.log(fileDiff);
    } else if (options.format === true) {
      console.log(fileDiff);
    } else {
      console.log(plainDiff);
    }
  });

export default program;
