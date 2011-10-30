
var chron = (function (global) {
  'use strict';

  if (!global.localStorage) {
    return;
  }

  var 

    localStorage = global.localStorage,

    serialize = function (object) {
      return JSON.stringify(object);
    },
    deserialize = function (serial) {
      return JSON.parse(serial);
    };

  return {
    /**
     * Take a snapshot of the given value
     *
     * @param   value {Object}  Object to snapshot
     * @returns       {Number}  Time of the snap shot in milliseconds since epoch
     * @example:
     *  chron.snap($form)
     */
    snap: function (value) {
      var time = +(new Date);
      return localStorage.setItem(time, serialize(value)), time;
    },

    /**
     * Return list of recent snapshopts. Use count to specify how many recent
     * snapshots to return;
     *
     * @param count {Number}  How many items to return
     * @returns     {Array}   List of recent snapshots
     * @example:
     *  chron.list(5);
     */
    list: function (count) {

      count = (+count) | 0;
      if (count == 0) { 
        return [];
      }

      var result = [],
          timeline = [],
          index,
          length,
          time;

//
// Query localStorage object and extract all time-based KVP

      for (index = 0, length = localStorage.length; index < length; index++) {
        time = localStorage.key(index);
        if (!/^[0-9]+$/.test(time)) 
          continue;

        timeline.push(time);
      }

      console.log(timeline);

//
// Sort given times in descending order

      timeline = timeline.sort(function (a, b) { return b - a; });

// 
// Now with sorted timeline, access value componet of the localStorage for given
// times and return them

      for (index = 0, length = count; index < length; index++) {
        result.push(deserialize(localStorage.getItem(timeline[index])));
      }

      return result;
    }
  };
}(this));

//
// Export this module

if ('undefined' != typeof module) {
  module.exports = chron;
}

