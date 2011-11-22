
/*jslint node: true, indent: 2, browser: true, es5: true */

var 

  /* internal object store, used like stack */
  store = [],

  /* program defaults */
  DEFAULT_COUNT = 5,

  /* getters and setters */
  snap,
  list,
  clear;

snap = function () {
  var 
  
    args = [].slice.call(arguments),
    index, length, value;

  for (index = 0, length = args.length; index < length; index += 1) {
    store.push({
      timestamp: +(new Date()),
      value: args[index]
    });
  }
};

list = function (count) {
  if (typeof count !== 'number') {
    count = DEFAULT_COUNT;
  }

  var

    length = store.length,
    index = length - count;

  return store.slice(index, length).reverse();
};

(function () {
  snap(1);
  snap(5, 4, 3, 2, 1);

  console.log(store);
  console.log(list(2));

  setTimeout(function () {
    snap('Hello World');
    console.log(list(1));
    console.log(list(0));
  }, 100);
}());



