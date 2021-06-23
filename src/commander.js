import { Command } from 'commander';
import { genDiff, stylish } from './index.js';

const program = new Command();

program
  .version('0.0.1', '-V, --version', 'output the version number')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', stylish)
  .action((filepath1, filepath2, options) => {
    if (options.format) {
      console.log(genDiff(filepath1, filepath2));
    }
    console.log(stylish(genDiff(filepath1, filepath2)));
  });

export default program;
