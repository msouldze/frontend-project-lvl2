import _ from 'lodash';
import path from 'path';
import { readFileSync } from 'fs';
import parseFile from './parsers.js';

const getFilePath = (filename) => path.resolve(process.cwd(), '__fixtures__', filename);
const getFileData = (filename) => readFileSync(getFilePath(filename), 'utf8');

const genDiff = (filename1, filename2) => {
  const fileData1 = parseFile(filename1, getFileData(filename1));
  const fileData2 = parseFile(filename2, getFileData(filename2));
  const dataEntries1 = Object.entries(fileData1);
  const dataEntries2 = Object.entries(fileData2);
  const unitedData = _.sortBy(_.union(dataEntries1, dataEntries2))
    .reduce((result, [key, value]) => {
      const newKey = `${key}:`;
      if (_.has(fileData1, key) && _.has(fileData2, key)) {
        if (fileData1[key] !== value) {
          result.push([' ', '+', newKey, value]);
        } else if (fileData2[key] !== value) {
          result.push([' ', '-', newKey, value]);
        } else {
          result.push([' ', ' ', newKey, value]);
        }
      }
      if (!_.has(fileData1, key) && _.has(fileData2, key)) {
        result.push([' ', '+', newKey, value]);
      }
      if (_.has(fileData1, key) && !_.has(fileData2, key)) {
        result.push([' ', '-', newKey, value]);
      }
      return result;
    }, []);
  const sortedData = unitedData
    .sort((a, b) => {
      if (a[2] === b[2]) {
        if (a[1] < b[1]) {
          return 1;
        }
        if (a[1] > b[1]) {
          return -1;
        }
        return 0;
      }
      return 1;
    })
    .map((data) => data.join(' '));
  const result = _.uniq(sortedData).join('\n');
  return `{\n${result}\n}`;
};

export default genDiff;
