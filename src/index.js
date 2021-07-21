import diff from './diff.js';
import stylish from './formatters/stylish.js';
import plain from './formatters/plain.js';
import json from './formatters/json.js';

const genDiff = (data1, data2, formatName = 'stylish') => {
  const formats = {
    stylish,
    plain,
    json,
  };
  const diffResult = diff(data1, data2);
  return formats[formatName](diffResult);
};

export default genDiff;
