import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('json format comparison', () => {
  const actual = genDiff('file1.json', 'file2.json');
  const expected = readFile('result.txt');

  expect(actual).toEqual(expected);
});

test('yaml format comparison', () => {
  const actual = genDiff('filepath1.yml', 'filepath2.yaml');
  const expected = readFile('result.txt');

  expect(actual).toEqual(expected);
});
