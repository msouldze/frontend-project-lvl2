import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const getFormatter = (formatName) => {
  const formats = {
    stylish,
    plain,
    json,
  };
  return formats[formatName];
};

export default getFormatter;
