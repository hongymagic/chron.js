
var chron = require('./chron.js');

describe('chron.js', function () {
  localStorage.clear();

  it('should save given value', function () {
    var value = { Hello: 'World' },
        time = chron.snap(value);

    expect(time).toMatch(/^[0-9]$/);
  });

  it('should return most recent snapshots', function () {
    var recent = chron.list(5);
    expect(recent).toBe([5, 4, 3, 2, 1]);
  });
});
