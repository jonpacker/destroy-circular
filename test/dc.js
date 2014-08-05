var assert = require('assert');
var dc = require('../');
describe('destroy-circular', function() {
  it ('should destroy circular references', function() {
    var obj = {};
    var child = {parent: obj};
    obj.child = child;

    var destroyed = dc(obj);
    assert.equal(typeof destroyed, 'object');
    assert.equal(destroyed.child.parent, '[Circular]');
  });
  it ('should not affect the original object', function() {
    var obj = {};
    var child = {parent: obj};
    obj.child = child;

    var destroyed = dc(obj);
    assert(destroyed != obj);
    assert(obj.child.parent == obj);
  });
})
