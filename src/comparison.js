import _ from 'lodash';

const buildTree = (data1, data2) => {
  if (!_.isObject(data1) || !_.isObject(data2)) {
    return data1 !== undefined ? String(data1) : String(data2);
  }
  if (!_.isObject(data1) && !_.isObject(data2)) {
    return !_.isObject(data1) ? String(data1) : String(data2);
  }

  const dataEntries1 = Object.entries(data1);
  const dataEntries2 = Object.entries(data2);
  const unitedData = _.union(dataEntries1, dataEntries2)
    .map(([key, value]) => {
      if (_.has(data1, key) && _.has(data2, key)) {
        if ((_.isObject(data1[key]) && _.isObject(data2[key])) || data1[key] === data2[key]) {
          return [' ', `${key}`, buildTree(data1[key], data2[key])];
        }
        if (data1[key] !== data2[key]) {
          if (data1[key] === value) {
            return ['-', `${key}`, buildTree(data1[key], data1[key])];
          }
          return ['+', `${key}`, buildTree(data2[key], data2[key])];
        }
      }
      return (!_.has(data1, key) && _.has(data2, key)) ? ['+', `${key}`, buildTree(data2[key], data2[key])] : ['-', `${key}`, buildTree(data1[key], data1[key])];
    });
  const result = _.uniqWith(unitedData, _.isEqual);
  const sorted = _.sortBy(result, (item) => {
    const [symbol, key] = item;
    return [key, -symbol];
  });
  return sorted;
};

export default buildTree;
