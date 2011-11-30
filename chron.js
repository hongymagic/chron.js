
/*jslint node: true, indent: 2, browser: true, es5: true */
(function (global) {
  'use strict';

  var

    localStorage = global.localStorage,
    supportsStorage = !!localStorage,
    key = function (name) {
      return 'chron.js:' + name;
    },

    backup = function (name, data) {
      if (!supportsStorage) {
        return data;
      }

      localStorage.setItem(key(name), JSON.stringify(data));
      return data;
    },
    restore = function (name) {
      if (!supportsStorage) {
        return [];
      }

      var store = localStorage.getItem(key(name));
      if (typeof store !== 'undefined' && store !== null) {
        return JSON.parse(localStorage.getItem(key(name)));
      } else {
        return [];
      }
    },

    Chron;

  Chron = function (name) {
    if (!(this instanceof Chron)) {
      return new Chron(name);
    }

// set the instance name, restore data from localStorage

    this.name = name;
    this.store = restore(name);
  };

  Chron.prototype.snap = function () {
    var 

// we snap each argument, one by one

      args = [].slice.call(arguments),
      index, 
      length;

    for (index = 0, length = args.length; index < length; index += 1) {
      this.store.push({
        timestamp: +(new Date()),
        value: args[index]
      });
    }

    backup(this.name, this.store);
  };

  Chron.prototype.list = function (count) {
    /* defaults */
    if (typeof count !== 'number') {
      count = 5;
    }

    var

      length = this.store.length,
      index = length - count;

    // We want positive slicing, not negative
    if (index < 0) {
      index = 0;
    }

    return this.store.slice(index, length).reverse();
  };

  Chron.prototype.clear = function () {
    delete this.store;
    this.store = [];

    backup(this.name, this.store);
  };

  global.Chron = Chron;

  if (typeof module !== 'undefined') {
    module.exports = Chron;
  }
}(this));

