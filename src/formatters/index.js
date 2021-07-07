import genDiff from '../diff.js';
import stylish from './stylish.js';

const formatter = (data1, data2, formatName = stylish) => {
  const diff = genDiff(data1, data2);
  return formatName(diff);
};

export default formatter;
