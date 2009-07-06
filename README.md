# jQuery Simply Countable plugin

jQuery plugin that provides a character counter for any text input or textarea.

## Usage

Simple usage:

    $('#my_textarea').simplyCountable();

Advanced usage:

    $('#my_textarea').simplyCountable({
        counter: '#counter',
        maxCount: 140,
        safeClass: 'safe',
        overClass: 'over'
    });

## Options

* `counter` - A jQuery selector to match the 'counter' element. Defaults to `#counter`.
* `maxCount` - The maximum character count of the text input or textarea. Defaults to `140`.
* `safeClass` - The CSS class applied to the counter element when it is within the maxCount figure. Defaults to `safe`.
* `overClass` - The CSS class applied to the counter element when it exceeds the maxCount figure. Defaults to `over`.

## License

Dual licensed under the [MIT](http://www.opensource.org/licenses/mit-license.php) and [GPL](http://www.opensource.org/licenses/gpl-license.php) licenses.

Copyright (c) 2009 [Aaron Russell](http://www.aaronrussell.co.uk)