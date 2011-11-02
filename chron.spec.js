
var chron = require('./chron.js');

describe('chron.js', function () {
  it('should save string values', function () {
    var time = chron.snap("This is a test string");
  });
});
