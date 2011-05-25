# jQuery Simply Countable plugin

jQuery plugin that provides a character counter for any text input or textarea. Works when typing and pasting text using the mouse.

* version - 0.4.2
* homepage - [http://github.com/aaronrussell/jquery-simply-countable/](http://github.com/aaronrussell/jquery-simply-countable/)
* author - [Aaron Russell](http://www.aaronrussell.co.uk)

## Usage

Simple usage:

    $('#my_textarea').simplyCountable();

Advanced usage:

    $('#my_textarea').simplyCountable({
        counter:            '#counter',
        countType:          'characters',
        wordSeparator:      ' ',
        maxCount:           140,
        strictMax:          false,
        countDirection:     'down',
        safeClass:          'safe',
        overClass:          'over',
        thousandSeparator:  ',',
        onOverCount:        function(count, countable, counter){},
        onSafeCount:        function(count, countable, counter){},
        onMaxCount:         function(count, countable, counter){}
    });

## Options

* `counter` - A jQuery selector to match the 'counter' element. Defaults to `#counter`.
* `countType` - Select whether to count `characters` or `words`. Defaults to `characters`.
* `wordSeparator` - The word separator when counting `words`. Defaults to _white-space_.
* `maxCount` - The maximum character (or word) count of the text input or textarea. Defaults to `140`.
* `strictMax` - Prevents the user from being able to exceed the `maxCount`. Defaults to `false`.
* `countDirection` - Select whether to count `down` or `up`. Defaults to `down`.
* `safeClass` - The CSS class applied to the counter element when it is within the maxCount figure. Defaults to `safe`.
* `overClass` - The CSS class applied to the counter element when it exceeds the maxCount figure. Defaults to `over`.
* `thousandSeparator` - The separator for multiples of 1,000. Set to `false` to disable. Defaults to `,`.
* `onOverCount` - Callback function called when counter goes over `maxCount` figure.
* `onSafeCount` - Callback function called when counter goes below `maxCount` figure.
* `onMaxCount` - Callback function called when in `strictMax` mode and counter hits `maxCount` figure.

## License

Dual licensed under the [MIT](http://www.opensource.org/licenses/mit-license.php) and [GPL](http://www.opensource.org/licenses/gpl-license.php) licenses.

Copyright (c) 2009-2010 [Aaron Russell](http://www.aaronrussell.co.uk).