// import _ from 'lodash';

const json = (data) => {
  const iter = (tree) => {
    if (!Array.isArray(tree)) {
      return tree;
    }
    const lines = tree.flatMap(([diff, key, value], index, array) => {
      if (!Array.isArray(value)) {
        if (diff === '+') {
          return `{"name":"${key}","value":"${value}","status":"added"}`;
        }
        if (diff === '-') {
          const [, key2, val2] = array[index + 1];
          if (key === key2) {
            array[index + 1].splice(0, array.length);
            return `{"name":"${key}","value":"${value}","status":"updated","oldValue":"${val2}"}`;
          }
          return `{"name":"${key}","value":"${value}","status":"removed"}`;
        }
        return diff === ' ' ? `{"name":"${key}","value":"${value}","status":"outdated"}` : [];
      }
      return `{"name":"${key}","value":"nested","status":"updated","children":${iter(value)}}`;
    });
    return `[${lines.join(',')}]`;
  };
  return iter(data);
};

export default json;

// [
//   { name: 'follow', value: false, status: 'removed' },
//   { name: 'host', value: 'hexlet.io', status: 'outdated' },
//   { name: 'proxy', value: '123.234.53.22', status: 'removed' },
//   { name: 'timeout', value: '20', status: 'updated', oldValue: '50' },
//   { name: 'setting6', value: 'nested', status: 'updated', children: [
//     { name: 'doge', value: 'nested', status: 'updated', children: [
//       { name: 'wow', value: 'so much', status: 'updated', oldValue: '' },
//     ] },
//     { name: 'ops', value: 'vops', status: 'added' },
//   ] },
// ]

// [
//   [
//     ' ',
//     'common',
//     [
//       [Array], [Array],
//       [Array], [Array],
//       [Array], [Array],
//       [Array], [Array]
//     ]
//   ],
//   [ ' ', 'group1', [ [Array], [Array], [Array], [Array], [Array] ] ],
//   [ '-', 'group2', [ [Array], [Array] ] ],
//   [ '+', 'group3', [ [Array], [Array] ] ]
// ]
