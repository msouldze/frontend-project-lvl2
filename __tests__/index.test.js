import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test.each([
  { actualJson: genDiff('file1.json', 'file2.json'), actualYaml: genDiff('file1.yml', 'file2.yaml'), expected: readFile('resultStylish.txt') },
  { actualJson: genDiff('file1.json', 'file2.json', 'stylish'), actualYaml: genDiff('file1.yml', 'file2.yaml', 'stylish'), expected: readFile('resultStylish.txt') },
  { actualJson: genDiff('file1.json', 'file2.json', 'plain'), actualYaml: genDiff('file1.yml', 'file2.yaml', 'plain'), expected: readFile('resultPlain.txt') },
  { actualJson: genDiff('file1.json', 'file2.json', 'json'), actualYaml: genDiff('file1.yml', 'file2.yaml', 'json'), expected: readFile('resultJson.txt') },
])('gendiff', ({ actualJson, actualYaml, expected }) => {
  expect(actualJson).toBe(expected);
  expect(actualYaml).toBe(expected);
});
