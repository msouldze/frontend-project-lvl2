const json = (data) => {
  if (!Array.isArray(data)) {
    return data;
  }
  const lines = data.reduce((arr, [diff, key, value], index, array) => {
    if (!Array.isArray(value)) {
      if (diff === '+') {
        if (array[index - 1] === undefined || !array[index - 1].includes(key)) {
          arr.push(`{"name":"${key}","value":"${value}","status":"added"}`);
        }
      }
      if (diff === '-') {
        if (array[index + 1] !== undefined && array[index + 1].includes(key)) {
          const [,, val2] = array[index + 1];
          arr.push(`{"name":"${key}","value":"${value}","status":"updated","oldValue":"${val2}"}`);
        } else {
          arr.push(`{"name":"${key}","value":"${value}","status":"removed"}`);
        }
      }
      if (diff === ' ') {
        arr.push(`{"name":"${key}","value":"${value}","status":"outdated"}`);
      }
    }
    if (typeof value === 'object') {
      arr.push(`{"name":"${key}","value":"nested","status":"updated","children":${json(value)}}`);
    }
    return arr;
  }, []);
  return `[${lines.join(',')}]`;
};

export default json;
