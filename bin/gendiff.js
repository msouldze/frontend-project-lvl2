#!/usr/bin/env node

import program from '../src/commander.js';

const gendiff = program.parse();
gendiff();

export default gendiff;