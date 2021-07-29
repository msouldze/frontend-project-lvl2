import path from 'path';
import { readFileSync } from 'fs';
import parseFile from './parsers.js';
import buildTree from './comparison.js';
import getFormatter from './formatters/formatter.js';

const getFilePath = (filename) => path.resolve(process.cwd(), '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFilePath(filename), 'utf8');
const getFileFormat = (filename) => path.extname(filename);

const genDiff = (filename1, filename2, formatName = 'stylish') => {
  // Read and parse the first file's data
  const data1 = readFile(filename1);
  const dataFormat1 = getFileFormat(filename1);
  const parsedData1 = parseFile(data1, dataFormat1);

  // Read and parse the second file's data
  const data2 = readFile(filename2);
  const dataFormat2 = getFileFormat(filename2);
  const parsedData2 = parseFile(data2, dataFormat2);

  // Compare two files' data and format their results
  const diffResult = buildTree(parsedData1, parsedData2);
  const formatDiff = getFormatter(formatName);
  return formatDiff(diffResult);
};

export default genDiff;
