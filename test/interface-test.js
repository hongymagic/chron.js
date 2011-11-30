
module('Interface test');

test('simple snap, list length integrity test', function () {
  var timeline = Chron('timeline');
  
  timeline.snap(1);
  timeline.snap(2);
  timeline.snap(3);
  timeline.snap(4);

  var history = timeline.list();

  equal(history.length, 4, 'I just snapped four!');
});








// Clean up after this test
if (localStorage) {
  localStorage.clear();
}

