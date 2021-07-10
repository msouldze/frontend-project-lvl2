const isObject = (value) => {
  if (typeof value === 'object') {
    return '[complex value]';
  } if (value === 'false' || value === 'true' || value === 'null') {
    return value;
  }
  return `'${value}'`;
};

const plain = (data) => {
  const iter = (tree, depth = '') => { 
    const lines = tree
      .flatMap(([diff, key, val], index, array) => {
        if (diff === '+') {
          return `Property '${depth}${key}' was added with value: ${isObject(val)}`;
        }
        if (diff === '-') {
          const [, key2, val2] = array[index + 1];
          if (key === key2) {
            array[index + 1].splice(0, array.length);
            return `Property '${depth}${key}' was updated. From ${isObject(val)} to ${isObject(val2)}`;
          }
          return `Property '${depth}${key}' was removed`;
        } if (diff === undefined) {
          return [];
        }
        return (typeof val === 'object') ? iter(val, `${depth}${key}.`) : [];
      });
    return lines.join('\n');
  };
  return iter(data);
};

export default plain;
