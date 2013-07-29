jQuery formatDateTime Plugin [![Build Status](https://travis-ci.org/agschwender/jquery.formatDateTime.png)](https://travis-ci.org/agschwender/jquery.formatDateTime)
============================

A jQuery plugin that converts a date object to a supplied format. It was forked from the [jQuery UI DatePicker module](https://github.com/jquery/jquery-ui/blob/master/ui/jquery.ui.datepicker.js) to support time formatting as well as the original date formatting.

Refer to the `dist` directory for versions of the library which can be used directly in your application.

Formats
=======

The plugin supports the following formatting combinations:

    a - Ante meridiem and post meridiem
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

    $.formatDateTime('mm/dd/y g:ii a', new Date('2012/07/05 09:55:03')); // 07/05/12 9:55 AM
    $.formatDateTime('mm/dd/y gg:ii:ss.uu a', new Date('2012/01/01 00:00:00.000')); // 01/01/12 12:00:00.000 AM

Using an element attribute, e.g.

    <span id="example" data-datetime="2012/07/05 09:55:03" />

and calling

    $('#example').formatDateTime('mm/dd/y g:ii a');

will produce

    <span id="example" data-datetime="2012/07/05 09:55:03">07/05/12 9:55 AM</span>

Or it can override the text of an element, e.g.

    <span id="example">2012/07/05 09:55:03</span>

By calling

    $('#example').formatDateTime('mm/dd/y g:ii a');

will produce

    <span id="example">07/05/12 9:55 AM</span>

Testing
=======

Tests are run using [QUnit](http://docs.jquery.com/QUnit). All tests can be run through your browser using the test runner at tests/index.html.

Or alternatively, you can install [nodejs](http://nodejs.org/) and run:

    $ npm install
    $ grunt qunit

Contributing
============

This project is managed using [grunt](http://gruntjs.com/). To initialize the project, run

    $ npm install

Once initialized, run

    $ grunt

This will run all the tasks needed for building and testing the library. It will produce deployable versions of the library in the `dist` directory. For convenience to users who may not want to build the application, they are also included in the repository and should be included as part of any commits back to the repository.

License
=======

Copyright (c) 2012 Adam Gschwender
Licensed under the MIT, GPL licenses.
