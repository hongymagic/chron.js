
module('Interface test');

test('simple snap, list length integrity test', function () {
  var timeline = Chron('timeline'),
      timestamp = timeline.snap(true, false, 1, 3.14, 'Hello World', { fruit: 'Banana' }),
      history = timeline.list(6),
      expected = [
        { timestamp: timestamp, value: { fruit: 'Banana' } },
        { timestamp: timestamp, value: 'Hello World' },
        { timestamp: timestamp, value: 3.14 },
        { timestamp: timestamp, value: 1 },
        { timestamp: timestamp, value: false },
        { timestamp: timestamp, value: true }
      ];

  deepEqual(history, expected, 'snap. list. complete.');
});

// Clean up after this test
if (localStorage) {
  localStorage.clear();
}

