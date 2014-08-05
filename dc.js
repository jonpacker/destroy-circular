module.exports = function(obj) {
  function copy(from, seen) {
    var to = Array.isArray(from) ? [] : {};
    seen.push(from);
    Object.keys(from).forEach(function(key) {
      if (!from[key] || (typeof from[key] != 'object' && !Array.isArray(from[key]))) 
        to[key] = from[key];
      else if (seen.indexOf(from[key]) == -1) {
        to[key] = copy(from[key], seen.slice(0));
      } else to[key] = '[Circular]';
    });
    return to;
  };
  return copy(obj, []);
};
