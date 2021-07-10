import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import formatter from '../src/formatters/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test.each([
  { actualJson: formatter('file1.json', 'file2.json'), expected: readFile('resultStylish.txt') },
  { actualJson: formatter('file1.json', 'file2.json', 'stylish'), expected: readFile('resultStylish.txt') },
  { actualJson: formatter('file1.json', 'file2.json', 'plain'), expected: readFile('resultPlain.txt') },
  { actualJson: formatter('file1.json', 'file2.json', 'json'), expected: readFile('resultJson.txt') },
])('json', ({ actualJson, expected }) => {
  expect(actualJson).toBe(expected);
});

test.each([
  { actualYaml: formatter('file1.yml', 'file2.yaml'), expected: readFile('resultStylish.txt') },
  { actualJson: formatter('file1.yml', 'file2.yaml', 'stylish'), expected: readFile('resultStylish.txt') },
  { actualYaml: formatter('file1.yml', 'file2.yaml', 'plain'), expected: readFile('resultPlain.txt') },
  { actualYaml: formatter('file1.yml', 'file2.yaml', 'json'), expected: readFile('resultJson.txt') },
])('yaml', ({ actualYaml, expected }) => {
  expect(actualYaml).toBe(expected);
});
