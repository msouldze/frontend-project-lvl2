const stylish = (data, replacer = ' ', spacesCount = 2) => {
  const iter = (tree, depth) => {
    if (!Array.isArray(tree)) {
      return tree;
    }
    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    const lines = tree
      .map(([diff, key, val]) => `${currentIndent}${diff} ${key}: ${iter(val, depth + 2)}`);
    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };
  return iter(data, 1);
};
export default stylish;
