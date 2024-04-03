

// Post CSS utility to remove css classes
// that come from third party imports.

module.exports = function(classes) {

  // Match class name helper
  const matchClassnames = function(selector) {
    if (!classes.length) {
      return;
    }

    let matches = false;

    classes.forEach(function(className) {
      if (selector.indexOf(className) > -1) {
        matches = true;
      }
    });

    return matches;
  };

  // Return css process function
  return function(css, opts) {
    css.walkRules(function(node) {

      if (matchClassnames(node.selector)) {
        node.remove();
      }
    });
  };
};
