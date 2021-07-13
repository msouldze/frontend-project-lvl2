import yaml from 'js-yaml';
import path from 'path';

const parseFile = (filename, data) => {
  const format = path.extname(filename);

  // Выбирается функция-парсер в зависимости от расширения файла
  const parse = (format === '.yml' || format === '.yaml') ? yaml.load(data) : JSON.parse(data);
  return parse;
};

export default parseFile;
