/**
 * Transform react to react/lib/ReactIsomorphic for pure React requires until
 * the ReactDOM separation happens for realsies.
 */
module.exports = babel => {
  const maybeUpdate = node => {
    if (node.value && node.value.toLowerCase() === 'react') {
      node.value = 'react/lib/ReactIsomorphic';
    }
  };

  return {
    visitor: {
      CallExpression(path, opts) {
        if (path.get('callee').node.name !== 'require') {
          return;
        }

        const node = path.node;
        if (node.arguments.length === 1) {
          maybeUpdate(node.arguments[0]);
        }
      },

      ImportDeclaration(path, opts) {
        const source = path.get('source');
        maybeUpdate(source.node);
      },
    },
  };
};

