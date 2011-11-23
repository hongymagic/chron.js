
/*jslint node: true, indent: 2, browser: true, es5: true */

var Chron = function (name) {
  if (!(this instanceof Chron)) {
    return new Chron(name);
  }

  this.name = name;

  /* internal object store, used like stack */
  this.store = [];
};

Chron.prototype.snap = function () {
  var 
  
    args = [].slice.call(arguments),
    index, length, value;

  for (index = 0, length = args.length; index < length; index += 1) {
    this.store.push({
      timestamp: +(new Date()),
      value: args[index]
    });
  }
};

Chron.prototype.list = function (count) {
  if (typeof count !== 'number') {
    count = 5;
  }

  var

    length = this.store.length,
    index = length - count;

  return this.store.slice(index, length).reverse();
};

Chron.prototype.clear = function () {
  delete this.store;
  this.store = [];
};

(function () {
  var 

    /**
     * has - simple test method
     *
     * @param   {Object}    object being tested
     * @param   {string}    expected outcome of the typeof
     * @param   {[string]}  properties, methods to test
     */
    has = function (object, type) {
      var 
      
        methods = [].slice.call(arguments, 2),
        test = false,
        index,
        length,
        method;

      for (index = 0, length = methods.length; index < length; index += 1) {
        method = methods[index];
        console.log('has', object, method, object && typeof object[method] === type);
      }
    },

//
// 3 different ways to create an instance of Chron

    _100m = Object.create(Chron), /* TODO: does not work */
    _200m = new Chron('200m race'),
    _400m = Chron('400m race');

//
// Interface test

  has(_200m, 'function', 'snap', 'list', 'clear'); 
  has(_400m, 'function', 'snap', 'list', 'clear'); 

  has(_200m, 'string', 'name'); 
  has(_400m, 'string', 'name'); 

  _200m.snap('David');
  _200m.snap('John');
  _200m.snap('Steve');

  var index, length, time, times = _200m.list(10).reverse();
  for (index = 0, length = times.length; index < length; index += 1) {
    time = times[index];
    console.log(time.value + ' arrived at ' + time.timestamp);
  }
}());

