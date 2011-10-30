
var chron = require('./chron.js');

describe('chron.js', function () {
  it('should save given value', function () {
    var value = { Hello: 'World' },
        time = chron.snap(value);

    expect(time).toMatch(/^[0-9]$/);
  });

  it('should return most recent snapshots', function () {
    chron.snap(1);
    chron.snap(2);
    chron.snap(3);
    chron.snap(4);
    chron.snap(5);

    var recent = chron.list(5);

    expect(recent).toBe([5, 4, 3, 2, 1]);
  });
});
