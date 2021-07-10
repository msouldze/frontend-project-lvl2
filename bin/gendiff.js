#!/usr/bin/env node

import { Command } from 'commander';
import formatter from '../src/formatters/index.js';

const program = new Command();

program
  .version('0.0.1', '-V, --version', 'output the version number')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2, options) => {
    if (options.format === 'plain') {
      console.log(formatter(filepath1, filepath2, 'plain'));
    } else if (options.format === 'json') {
      console.log(formatter(filepath1, filepath2, 'json'));
    } else {
      console.log(formatter(filepath1, filepath2));
    }
  });

program.parse();
