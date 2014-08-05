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
  it('should only destroy parent references', function() {
    var obj = {};
    var common = { thing: obj };
    obj.one = { firstThing: common };
    obj.two = { secondThing: common };
    
    var d = dc(obj);
    assert(typeof d.one.firstThing == 'object')
    assert(typeof d.two.secondThing == 'object')
    assert.equal(d.one.firstThing.thing, '[Circular]')
    assert.equal(d.two.secondThing.thing, '[Circular]')
  });
  it('should work on arrays', function() {
    var obj = {};
    var common = [obj];
    var x = [common];
    var y = [['test'], common];
    y[0][1] = y;
    obj.a = {x:x};
    obj.b = {y:y};

    var d = dc(obj);
    assert(Array.isArray(d.a.x));
    assert.equal(d.a.x[0][0], '[Circular]');
    assert.equal(d.b.y[0][0], 'test');
    assert.equal(d.b.y[1][0], '[Circular]');
    assert.equal(d.b.y[0][1], '[Circular]');
  });
})
