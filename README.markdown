# chron.js API

## .snap(in any value) => out datetime

Take a snapshot of the value at any given time and it will return a `datetime` in number of milliseconds since the Epoch.

Rest assured, your value will be persistent.

	var form = { name: 'John Appleseed', age: 29 };
	var last = chron.snap(form);

## .list(in number) => out [value] array

Returns a list of most recent number of values saved. The returned `array` will contain most recent value at index zero.

	var recent = chron.list();
	// [{ name: 'John Appleseed', age: 29 }]

You can also supply number of recent values to return:

	var recent = chron.list(5);
	recent.length;
	// 5 (or less, if you don't have enough snapshots)

# Why?



# TODO

- Write why