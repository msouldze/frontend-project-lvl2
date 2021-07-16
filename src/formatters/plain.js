import _ from 'lodash';

const isBoolean = (value) => {
  if (value === 'true' || value === 'false') {
    return true;
  }
  return false;
};
const isNull = (value) => value === 'null';

const isNumber = (value) => {
  const num = parseFloat(value);
  return _.isNumber(num) && !_.isNaN(num);
};

const isObject = (value) => {
  if (typeof value === 'object') {
    return '[complex value]';
  } if (isBoolean(value) || isNull(value) || isNumber(value)) {
    return value;
  }
  return `'${value}'`;
};

const plain = (data) => {
  const iter = (tree, depth = '') => {
    if (!Array.isArray(tree)) {
      return tree;
    }
    const lines = tree.reduce((arr, [diff, key, val], index, array) => {
      if (diff === '+') {
        if (array[index - 1] === undefined || !array[index - 1].includes(key)) {
          arr.push(`Property '${depth}${key}' was added with value: ${isObject(val)}`);
        }
      }
      if (diff === '-') {
        if (array[index + 1] !== undefined && array[index + 1].includes(key)) {
          const [,, val2] = array[index + 1];
          arr.push(`Property '${depth}${key}' was updated. From ${isObject(val)} to ${isObject(val2)}`);
        } else {
          arr.push(`Property '${depth}${key}' was removed`);
        }
      }
      if (typeof val === 'object') {
        arr.push(iter(val, `${depth}${key}.`));
      }
      return arr;
    }, []);
    return lines.flat();
  };
  return iter(data).join('\n');
};

export default plain;
