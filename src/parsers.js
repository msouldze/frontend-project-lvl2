import yaml from 'js-yaml';
import path from 'path';

const parseFile = (filename, data) => {
  const format = path.extname(filename);

  // Выбирается функция-парсер в зависимости от расширения файла
  let parse;
  if (format === '.json') {
    parse = JSON.parse;
  } else if (format === '.yml' || format === '.yaml') {
    parse = yaml.load;
  }
  return parse(data);
};

export default parseFile;
