
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

`chron.js` instances will use `localStorage` to store/restore any items that
have been snapped.

