import _ from 'lodash';
import path from 'path';
import { readFileSync } from 'fs';
import parseFile from './parsers.js';
import stylish from '../formatters/stylish.js';

const getFilePath = (filename) => path.resolve(process.cwd(), '__fixtures__', filename);
const getFileData = (filename) => readFileSync(getFilePath(filename), 'utf8');
const isObject = (data) => data != null && typeof data === 'object';

const genDiff = (filename1, filename2, formatName = stylish) => {
  const fileData1 = parseFile(filename1, getFileData(filename1));
  const fileData2 = parseFile(filename2, getFileData(filename2));
  const iter = (data1, data2) => {
    if (!isObject(data1) || !isObject(data2)) {
      return data1 !== undefined ? String(data1) : String(data2);
    }
    if (!isObject(data1) && !isObject(data2)) {
      return !isObject(data1) ? String(data1) : String(data2);
    }

    const dataEntries1 = Object.entries(data1);
    const dataEntries2 = Object.entries(data2);
    const unitedData = _.sortBy(_.unionWith(dataEntries1, dataEntries2, _.isEqual))
      .map(([key, value]) => {
        if (_.has(data1, key) && _.has(data2, key)) {
          if ((isObject(data1[key]) && isObject(data2[key])) || data1[key] === data2[key]) {
            return [' ', `${key}`, iter(data1[key], data2[key])];
          }
          if (data1[key] !== data2[key]) {
            if (data1[key] === value) {
              return ['-', `${key}`, iter(data1[key], data1[key])];
            }
            return ['+', `${key}`, iter(data2[key], data2[key])];
          }
        }
        return (!_.has(data1, key) && _.has(data2, key)) ? ['+', `${key}`, iter(data2[key], data2[key])] : ['-', `${key}`, iter(data1[key], data1[key])];
      });
    const result = _.uniqWith(unitedData, _.isEqual)
      .sort((a, b) => {
        if (a[1] === b[1]) {
          if (a[0] < b[0]) {
            return 1;
          }
          if (a[0] > b[0]) {
            return -1;
          }
          return 0;
        }
        return 1;
      });
    return result;
  };
  return formatName(iter(fileData1, fileData2));
};

export default genDiff;
