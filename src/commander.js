import { Command } from 'commander';
import genDiff from './index.js';

const program = new Command();

program
  .version('0.0.1', '-V, --version', 'output the version number')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2, options) => {
    if (options.format) {
      const format1 = filepath1.split('.')[1];
      const format2 = filepath2.split('.')[1];
      console.log(format1, format2);
    }
    console.log(genDiff(filepath1, filepath2));
  });

export default program;
