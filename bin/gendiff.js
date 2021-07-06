#!/usr/bin/env node

import { Command } from 'commander';
import formatter from '../src/formatters/formatter.js';
import stylish from '../src/formatters/stylish.js';
import plain from '../src/formatters/plain.js';
import json from '../src/formatters/json.js';

const program = new Command();

program
  .version('0.0.1', '-V, --version', 'output the version number')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', stylish)
  .action((filepath1, filepath2, options) => {
    const fileDiff = formatter(filepath1, filepath2);
    const plainDiff = formatter(filepath1, filepath2, plain);
    const jsonDiff = formatter(filepath1, filepath2, json);
    if (options.format === 'plain') {
      console.log(plainDiff);
    } else if (options.format === 'json') {
      console.log(jsonDiff);
    } else {
      console.log(fileDiff);
    }
  });

program.parse();
