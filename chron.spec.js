
var chron = require('./chron.js'),
    compareArrays = function (left, right) {
      console.log(left, right);
      if (left.length !== right.length) {
        return false;
      }

      var index, length;
      for (index = 0, length = left.length; index < left.length; index++) {
        if (left[index] !== right[index]) {
          return false;
        }
      }

      return true;
    };

//
// Simple test
//

(function () {
  chron.snap(5);
  chron.snap(4);
  chron.snap(3);
  chron.snap(2);
  chron.snap(1);
  chron.snap(0);


  console.log(chron.list());

  var expected = [ 0, 1, 2, 3, 4 ],
      actual = chron.list();

// 
// Chron.js returns 5 items by default

  console.log('Simple test:', compareArrays(expected, actual));
}());

