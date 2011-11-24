
/*jslint node: true, indent: 2, browser: true, es5: true */
(function (global) {

  var

    localStorage = window.localStorage,
    supportsStorage = !!localStorage,
    key = function (name) {
      return 'chron.js:' + name;
    },
    save = function (name, data) {
      if (!supportsStorage) {
        return data;
      }

      localStorage.setItem(key(name), JSON.stringify(data));
      return data;
    },
    get = function (name) {
      if (!supportsStorage) {
        return [];
      }

      return JSON.parse(localStorage.getItem(key(name)));
    };


  var Chron = function (name) {
    if (!(this instanceof Chron)) {
      return new Chron(name);
    }

    this.name = name;

    /* internal object store, used like stack */
    this.store = get(name);
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

  global.Chron = Chron;
}(this));

