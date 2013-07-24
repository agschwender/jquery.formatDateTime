jQuery formatDateTime Plugin
============================

A jQuery plugin that converts a date object to a supplied format. It was forked from the [jQuery UI DatePicker module](https://github.com/jquery/jquery-ui/blob/master/ui/jquery.ui.datepicker.js) to support time formatting as well as the original date formatting.

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

    $.formatDateTime('mm/dd/y g:ii a', new Date('2012/07/05 09:55:03')); // 07/05/12 9:55 AM
    $.formatDateTime('mm/dd/y gg:ii:ss.uu a', new Date('2012/01/01 00:00:00.000')); // 01/01/12 12:00:00.000 AM

Running the Unit Tests
======================

Tests are run using [QUnit](http://docs.jquery.com/QUnit). All tests can be run using the test runner at tests/index.html.
