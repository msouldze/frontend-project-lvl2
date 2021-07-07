const json = (data) => {
  if (!Array.isArray(data)) {
    return data;
  }
  const lines = data.flatMap(([diff, key, value], index, array) => {
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
    return `{"name":"${key}","value":"nested","status":"updated","children":${json(value)}}`;
  });
  return `[${lines.join(',')}]`;
};

export default json;
