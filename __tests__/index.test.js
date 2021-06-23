import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import { genDiff, stylish } from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('json format comparison', () => {
  const actual = stylish(genDiff('file1.json', 'file2.json'));
  const expected = readFile('result.txt');

  expect(actual).toEqual(expected);
});

test('yaml format comparison', () => {
  const actual = stylish(genDiff('file1.json', 'file2.json'));
  const expected = readFile('result.txt');

  expect(actual).toEqual(expected);
});
