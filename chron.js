
(function (global) {
  'use strict';

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
      localStorage.setItem(+(new Date), serialize(value));
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
      var result = [],
          timeline = [],
          index,
          length,
          time;

//
// Query localStorage object and extract all time-based KVP

      for (index = 0, length = localStorage.length; index < length; index++) {
        time = localStorage.key(index);
        if (!/^[0-9]$/.test(time)) 
          continue;

        timeline.push(localStorage.getItem(time));
      }

//
// Sort given times in descending order

      timeline = timeline.sort(function (a, b) { return a - b; });

// 
// Now with sorted timeline, access value componet of the localStorage for given
// times and return them

      for (index = 0, length = count; index < length; index++) {
        result.push(deserialize(localStorage.getItem(timeline[index]));
      }

      return result;
    }
  };
}(this));

