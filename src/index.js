import _ from 'lodash';
import { readFileSync } from 'fs';

const getFileData = (fileName) => {
  const data = readFileSync(fileName, 'utf8');
  return JSON.parse(data);
};

const genDiff = (filepath1, filepath2) => {
  const fileData1 = getFileData(filepath1);
  const fileData2 = getFileData(filepath2);
  const f1 = Object.entries(fileData1).map((str) => str.join(': '));
  const f2 = Object.entries(fileData2).map((str) => str.join(': '));
  const unitedData = _.union(f1, f2)
    .sort()
    .reduce((result, data) => {
      const key = data.slice(0, data.indexOf(':'));
      const value = data.slice(data.indexOf(':'));
      if (_.has(fileData1, key) && _.has(fileData2, key)) {
        if (fileData1[key] !== value) {
          result.push(`+ ${data}`);
        } else if (fileData2[data] !== value) {
          result.push(`- ${data}`);
        } else {
          result.push(`  ${data}`);
        }
      }
      if (!_.has(fileData1, key) && _.has(fileData2, key)) {
        result.push(`+ ${data}`);
      }
      if (_.has(fileData1, key) && !_.has(fileData2, key)) {
        result.push(`- ${data}`);
      }
      return result;
    }, [])
    .join('\n');
  return `{\n${unitedData}\n}`;
};

export default genDiff;
