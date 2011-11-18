
/*jslint node: true, indent: 2, browser: true, es5: true, plusplus: true */






var Chron = (function (global) {



  var 
  
    supportsStorage = function () {
      try {
        return !!global.localStorage.getItem;
      } catch (e) {
        return false;
      }
    }(),

// 
// Simple stack data structure

    Stack = function (size) {
      this.size   = (size | 0);
      this._store = [];
    };

  Stack.prototype.push = function (object) {};
  Stack.prototype.pop = function (count) {};


  return {
    /**
     * take a snapshot of an object
     *
     * @param   {Object}  object to store in timeline
     * @returns {Date}    timestamp in milliseconds since the Unix epoch
     */
    snap: function (object) {
    },

    /**
     * retrieve number of snapshots in a sorted array, in descending order
     *
     * @param   {Number}  number of objects to return
     * @returns {Array}   array of boxed objects that contain timestamp as property
     */
    timeline: function () {
    }
  };
})(this));

//
// check for module support

if (module.exports) {
  module.exports = Chron;
}


//
// [
//  {
//    timestamp: +new Date,
//    value: object
//  }
//  ...
// ]
//












