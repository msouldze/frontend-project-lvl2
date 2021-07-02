import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';
import plain from '../formatters/plain.js';
import json from '../formatters/json.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('stylish', () => {
  const actualJson = genDiff('file1.json', 'file2.json');
  const actualYaml = genDiff('file1.yml', 'file2.yaml');
  const expected = readFile('resultStylish.txt');

  expect(actualJson).toEqual(expected);
  expect(actualYaml).toEqual(expected);
});

test('plain', () => {
  const actualJson = genDiff('file1.json', 'file2.json', plain);
  const actualYaml = genDiff('file1.yml', 'file2.yaml', plain);
  const expected = readFile('resultPlain.txt');

  expect(actualJson).toEqual(expected);
  expect(actualYaml).toEqual(expected);
});

test('json', () => {
  const actualJson = genDiff('file1.json', 'file2.json', json);
  const actualYaml = genDiff('file1.yml', 'file2.yaml', json);
  const expected = readFile('resultJson.txt');

  expect(actualJson).toEqual(expected);
  expect(actualYaml).toEqual(expected);
});
