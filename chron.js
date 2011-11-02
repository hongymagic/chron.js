
/*jslint node: true, indent: 2, browser: true, es5: true, plusplus: true */
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

    supportsStorage = (function () {
      try {
        return !!global.localStorage;
      } catch (e) {
        return false;
      }
    }()),
    localStorage = global.localStorage,

    serialize = function (object) {
      return JSON.stringify(object);
    },
    deserialize = function (serial) {
      return JSON.parse(serial);
    },

    /**
     * Custom storage object
     *
     * {
     *  time1: { object }
     *  ..
     *  tineN: { object }
     * }
     */
    _store = supportsStorage ? deserialize(localStorage.getItem('chron.js')) : {},
    _getItem = function (key) {
      return deserialize(_store[key]);
    },
    _setItem = function (value) {
      var timestamp = +(new Date());
      _store[timestamp] = serialize(value);

      if (supportsStorage) {
        localStorage.setItem('chron.js', serialize(_store));
      }

      return timestamp;
    },
    _clear = function () {
      _store = {};

      if (supportsStorage) {
        localStorage.setItem('chron.js', serialize(_store));
      }
    },

    /**
     * Returns all times of all snapshots captured by chron.js. Time are 
     * sorted in descending order (more recent first)
     *
     * @private
     * @returns {Array} of times (in milliseconds after the epoch)
     */
    _timeline = function () {
      var timeline = Object.keys(_store),
          desc = function (a, b) {
            return Number(b) - Number(a);
          };

// Sort given times in descending order

      timeline = timeline.sort(desc);
      return timeline;
    };

  if ('undefined' === typeof _store || _store === null) {
    _store = {};
  }

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
      return _setItem(value);
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
      if (count === 0) { 
        return [];
      }

      var result = [],
          timeline = _timeline(),
          index,
          length = count > timeline.length ? timeline.length : count;

// Now with sorted timeline, access value componet of the localStorage for
// given times and return them

      for (index = 0; index < length; index += 1) {
        result.push(_getItem(timeline[index]));
      }

      return result;
    },

    /**
     * Reset and clear all snapshots captured by chron.js
     */
    reset: function () {
      _clear();
    }
  };
}(this));

//
// Export this module

if ('undefined' !== typeof module) {
  module.exports = chron;
}

