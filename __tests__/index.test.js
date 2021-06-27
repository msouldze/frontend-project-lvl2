import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';
import plain from '../formatters/plain.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('stylish', () => {
  const actualJson = genDiff('file1.json', 'file2.json');
  const actualYaml = genDiff('filepath1.yml', 'filepath2.yaml');
  const expected = readFile('result.txt');

  expect(actualJson).toEqual(expected);
  expect(actualYaml).toEqual(expected);
});

test('plain', () => {
  const actualJson = genDiff('file1.json', 'file2.json', plain);
  const actualYaml = genDiff('filepath1.yml', 'filepath2.yaml', plain);
  const expected = readFile('resultPlain.txt');

  expect(actualJson).toEqual(expected);
  expect(actualYaml).toEqual(expected);
});
