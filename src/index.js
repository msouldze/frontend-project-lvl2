import _ from 'lodash';
import path from 'path';
import { readFileSync } from 'fs';

const readFileData = (filePath) => {
  const data = readFileSync(path.resolve(process.cwd(), '__fixtures__', filePath), 'utf8');
  return JSON.parse(data);
};

const genDiff = (filepath1, filepath2) => {
  const fileData1 = readFileData(filepath1);
  const fileData2 = readFileData(filepath2);
  const dataEntries1 = Object.entries(fileData1);
  const dataEntries2 = Object.entries(fileData2);
  const unitedData = _.sortBy(_.union(dataEntries1, dataEntries2))
    .sort((a, b) => {
      if (a[0] === b[0]) {
        return b[1] - a[1];
      }
      return b[0] - a[0];
    })
    .reduce((result, [key, value]) => {
      if (_.has(fileData1, key) && _.has(fileData2, key)) {
        if (fileData1[key] !== value) {
          result.push(`  + ${key}: ${value}`);
        } else if (fileData2[key] !== value) {
          result.push(`  - ${key}: ${value}`);
        } else {
          result.push(`    ${key}: ${value}`);
        }
      }
      if (!_.has(fileData1, key) && _.has(fileData2, key)) {
        result.push(`  + ${key}: ${value}`);
      }
      if (_.has(fileData1, key) && !_.has(fileData2, key)) {
        result.push(`  - ${key}: ${value}`);
      }
      return result;
    }, []);
  const result = _.uniq(unitedData).join('\n');
  return `{\n${result}\n}`;
};

export default genDiff;
