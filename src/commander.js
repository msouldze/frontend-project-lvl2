import { Command } from 'commander';
import genDiff from '../formatters/index.js';
import stylish from '../formatters/stylish.js';
import plain from '../formatters/plain.js';
import json from '../formatters/json.js';

const program = new Command();

program
  .version('0.0.1', '-V, --version', 'output the version number')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', stylish)
  .action((filepath1, filepath2, options) => {
    const fileDiff = genDiff(filepath1, filepath2);
    const plainDiff = genDiff(filepath1, filepath2, plain);
    const jsonDiff = genDiff(filepath1, filepath2, json);
    if (options.format === 'plain') {
      console.log(plainDiff);
    } else if (options.format === 'json') {
      console.log(jsonDiff);
    } else {
      console.log(fileDiff);
    }
  });

export default program;
