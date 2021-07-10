import genDiff from '../diff.js';
import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatter = (data1, data2, formatName = 'stylish') => {
  const formats = {
    stylish,
    plain,
    json,
  };
  const diff = genDiff(data1, data2);
  return formats[formatName](diff);
};

export default formatter;
