var circular = require('circular');
module.exports = function(obj) { return JSON.parse(JSON.stringify(obj, circular())) }
