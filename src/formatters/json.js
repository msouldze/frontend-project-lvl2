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
        if (array[index + 1] === undefined || !array[index + 1].includes(key)) {
          return `{"name":"${key}","value":"${value}","status":"removed"}`;
        }
        const [,, val2] = array[index + 1];
        array.splice(array[index + 1], 1);
        return `{"name":"${key}","value":"${value}","status":"updated","oldValue":"${val2}"}`;
      }
      return diff === ' ' ? `{"name":"${key}","value":"${value}","status":"outdated"}` : [];
    }
    return `{"name":"${key}","value":"nested","status":"updated","children":${json(value)}}`;
  });
  return `[${lines.join(',')}]`;
};

export default json;
