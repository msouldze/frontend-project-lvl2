import path from 'path';
import { readFileSync } from 'fs';
import parseFile from './parsers.js';
import getDiff from './comparison.js';

const getFilePath = (filename) => path.resolve(process.cwd(), '__fixtures__', filename);
const getFileData = (filename) => readFileSync(getFilePath(filename), 'utf8');

const diff = (filename1, filename2) => {
  const parseFile1 = parseFile(filename1);
  const parseFile2 = parseFile(filename1);
  const fileData1 = parseFile1(getFileData(filename1));
  const fileData2 = parseFile2(getFileData(filename2));
  return getDiff(fileData1, fileData2);
};

export default diff;
