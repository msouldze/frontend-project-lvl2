import yaml from 'js-yaml';

const parseFile = (data, format) => {
  const parse = (format === '.yml' || format === '.yaml') ? yaml.load : JSON.parse;
  return parse(data);
};

export default parseFile;
