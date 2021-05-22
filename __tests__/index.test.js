import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('difference generator', () => {
  const file1 = 'file1.json';
  const file2 = 'file2.json';
  const expected = readFile('result.txt');

  expect(genDiff(file1, file2)).toEqual(expected);
});
