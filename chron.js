
/**
 * chron.js - a time-based storage interface
 *
 * @requires localStorage
 *
 * Without localStorage support, it will use inline JSON object as storage
 * and will not persist;
 */
var chron = (function (global) {
  'use strict';

  var 

    supportsStorage = function () {
      try {
        return !!global.localStorage;
      } catch (e) {
        return false;
      }
    }(),
    localStorage = supportsStorage ? global.localStorage : {},

    serialize = function (object) {
      return JSON.stringify(object);
    },
    deserialize = function (serial) {
      return JSON.parse(serial);
    },

    /**
     * Returns all times of all snapshots captured by chron.js. Time are sorted
     * in descending order (more recent first)
     *
     * @private
     * @returns {Array} of times (in milliseconds after the epoch)
     */
    _timeline = function () {
      var timeline = [],
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

//
// Sort given times in descending order

      timeline = timeline.sort(function (a, b) { return b - a; });
      return timeline;
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
      localStorage.setItem(time, serialize(value));
      console.log(value, serialize(value));
      return time;
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
          timeline = _timeline(),
          index,
          length;

// 
// Now with sorted timeline, access value componet of the localStorage for given
// times and return them

      for (index = 0, length = timeline.length; index < length; index++) {
        result.push(deserialize(localStorage.getItem(timeline[index])));
      }

      return result;
    },

    /**
     * Reset and clear all snapshots captured by chron.js
     */
    reset: function () {
      var timeline = _timeline(),
          index,
          length;
      
      for (index = 0, length = timeline.length; index < length; index++) {
        localStorage.removeItem(timeline[index]);
      }
    }
  };
}(this));

//
// Export this module

if ('undefined' != typeof module) {
  module.exports = chron;
}

