jQuery formatDateTime Plugin [![Build Status](https://travis-ci.org/agschwender/jquery.formatDateTime.png)](https://travis-ci.org/agschwender/jquery.formatDateTime)
============================

A jQuery plugin that converts a date object to a supplied format. It was forked from the [jQuery UI DatePicker module](https://github.com/jquery/jquery-ui/blob/master/ui/jquery.ui.datepicker.js) to support time formatting as well as the original date formatting.

Refer to the `dist` directory for versions of the library which can be used directly in your application.

Formats
=======

The plugin supports the following formatting combinations:

    a  - ante meridiem and post meridiem
    d  - day of month (no leading zero)
    dd - day of month (two digit)
    o  - day of year (no leading zeros)
    oo - day of year (three digit)
    D  - day name short
    DD - day name long
    g  - 12-hour hour format of day (no leading zero)
    gg - 12-hour hour format of day (two digit)
    h  - 24-hour hour format of day (no leading zero)
    hh - 24-hour hour format of day (two digit)
    u  - millisecond of second (no leading zeros)
    uu - millisecond of second (three digit)
    i  - minute of hour (no leading zero)
    ii - minute of hour (two digit)
    m  - month of year (no leading zero)
    mm - month of year (two digit)
    M  - month name short
    MM - month name long
    S  - ordinal suffix for the previous unit
    s  - second of minute (no leading zero)
    ss - second of minute (two digit)
    y  - year (two digit)
    yy - year (four digit)
    @  - Unix timestamp (ms since 01/01/1970)
    !  - Windows ticks (100ns since 01/01/0001)
    '...' - literal text
    '' - single quote

Examples
========

Calling the function with a date.

```javascript
$.formatDateTime('mm/dd/y g:ii a', new Date('2012/07/05 09:55:03')); // 07/05/12 9:55 AM
$.formatDateTime('mm/dd/y gg:ii:ss.uu a', new Date('2012/01/01 00:00:00.000')); // 01/01/12 12:00:00.000 AM
```

Using an element attribute, e.g.

```html
<span id="example" data-datetime="2012/07/05 09:55:03" />
```

and calling

```javascript
$('#example').formatDateTime('mm/dd/y g:ii a');
```

will produce

```html
<span id="example" data-datetime="2012/07/05 09:55:03">07/05/12 9:55 AM</span>
```

Or you can specify the date format in the `data-dateformat` attribute in the element, e.g.

```html
<span id="example" data-datetime="2012/07/05 09:55:03" data-dateformat="mm/dd/y g:ii a">07/05/12 9:55 AM</span>
```

and calling

```javascript
$('#example').formatDateTime()
```

will produce

```html
<span id="example" data-datetime="2012/07/05 09:55:03" data-dateformat="mm/dd/y g:ii a">07/05/12 9:55 AM</span>
```

Or it can override the text of an element, e.g.

```html
<span id="example">2012/07/05 09:55:03</span>
```

By calling

```javascript
$('#example').formatDateTime('mm/dd/y g:ii a');
```

will produce

```html
<span id="example">07/05/12 9:55 AM</span>
```

Settings
--------

The defaults for formatting are all in English and use traditional capitalization, e.g. Monday, AM and August. This may not be appropriate for all applications. To override these defaults on a case-by-case basis, pass settings to `formatDateTime`, e.g.

```javascript
$.formatDateTime('mm/dd/y g:ii a', new Date('2012/07/05 09:55:03'), {ampmNames: ['am', 'pm']}); // 07/05/12 9:55 am
```

To permanently change the plugin defaults for your application, redefine them directly, e.g.

```javascript
$.formatDateTime.defaults['ampmNames'] = ['am', 'pm'];
$.formatDateTime('mm/dd/y g:ii a', new Date('2012/07/05 09:55:03')); // 07/05/12 9:55 am
```

Available settings are as follows:

  * `monthNames`: names of the months, e.g. January
  * `monthNamesShort`: shortened names of the months, e.g. Jan
  * `dayNames`: names of the days, e.g. Sunday
  * `dayNamesShort`: shortened names of the days, e.g. Sun
  * `ampmNames`: names of the 12-hour clock periods, e.g. AM
  * `getSuffix`: callback to convert number to ordinal suffix, e.g. 1 to st
  * `attribute`: attribute which contains the datetime
  * `formatAttribute`: attribute which contains the datetime format

Contributing
============

This project is managed using [grunt](http://gruntjs.com/). To initialize the project, run

    $ npm install -g grunt-cli

Once initialized, run

    $ grunt

This will run all the tasks needed for building and testing the library. It will produce deployable versions of the library in the `dist` directory. For convenience to users who may not want to build the application, they are also included in the repository and should be included as part of any commits back to the repository.

Testing
=======

Tests are run using [Jasmine](http://pivotal.github.io/jasmine/) via the [grunt jasmine plugin](https://github.com/gruntjs/grunt-contrib-jasmine). They can be run once your environment has been set up (see [Contributing](#contributing) for more details) by issuing

    $ grunt test

This will perform all tests of the library against jQuery versions 1.5 to 2.1.

License
=======

Copyright (c) 2012 Adam Gschwender
Licensed under the MIT, GPL licenses.
