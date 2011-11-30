# What is it?

Simple, persisted, and stacked data-store with emphasis on `time`. 

I made this as part of an in-house project to store and display recently 
entered, non-sensitive, `form` data.

# The Cook Book

`chron.js` only has three, but aliased to more, interface calls. Just like any
stack operation, you:

    1. Place it in the stack;
    2. Retrieve item in the stack; and
    3. Clear the stack.

## Capturing a moment of any `object`'s life

    var recents = Chron('recently viewed'); // `new` is _optional_
    recents.snap({ product: ... });

## Re-living them precious moments

    var recents = Chron('recently viewed');
    var products = recents.list(5); // 5 is _optional_, defaults to 5

## Wipe. Them. All.

    Chron('recently viewed').clear();

# Persistence

If the browser supports `localStorage`, `chron.js` will persist all instances
via the `localStorage`. This means that when you come back to the site at a
later date and run:

    var recents = Chron('recently viewed');
    // your previous snapped items will be loaded by default
