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
    const lines = tree
      .flatMap(([diff, key, val], index, array) => {
        if (diff === '+') {
          return `Property '${depth}${key}' was added with value: ${isObject(val)}`;
        }
        if (diff === '-') {
          if (array[index + 1] === undefined || !array[index + 1].includes(key)) {
            return `Property '${depth}${key}' was removed`;
          }
          const [,, val2] = array[index + 1];
          array.splice(array[index + 1], 1);
          return `Property '${depth}${key}' was updated. From ${isObject(val)} to ${isObject(val2)}`;
        }
        return (typeof val === 'object') ? iter(val, `${depth}${key}.`) : [];
      });
    return lines.join('\n');
  };
  return iter(data);
};

export default plain;
