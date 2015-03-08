/*global describe:false, it:false, expect:false*/
/*global beforeEach:false, afterEach:false*/
describe("jQuery.formatDateTime test suite", function() {
    var cases = {
        'Mon, 09 Jul 2012 20:29:54': [
            ['yy-mm-dd hh:ii:ss.u a', '2012-07-09 20:29:54.0 PM'],
            ['m/d/y g:ii:ss a', '7/9/12 8:29:54 PM'],
            ['DD, MM d, yy', 'Monday, July 9, 2012'],
            ['D, M d, yy', 'Mon, Jul 9, 2012']
        ],
        '2012/07/05 09:55:03': [
            ['mm/dd/y g:ii a', '07/05/12 9:55 AM'],
            ['mm/dd/y h:ii', '07/05/12 9:55'],
            ['o, yy hh:ii', '187, 2012 09:55']
        ],
        '2012/01/01 00:00:00': [
            ['mm/dd/y gg:ii:ss.u a', '01/01/12 12:00:00.0 AM'],
            ['mm/dd/y hh:ii:ss.uu a', '01/01/12 00:00:00.000 AM']
        ],
        '2012-01-01T00:00:00+01:00': [
            ['yy-mm-dd hh:ii:ss', '2011-12-31 23:00:00', {utc: true}]
        ],
        '2012-01-01': [
            ['yy-mm-dd', '2012-01-01', {utc: true}]
        ],
        '2001/02/03 00:04:21': [
            ['yyS mS ddS gS iS sSS', '2001st 2nd 03rd 12th 4th 21st']
        ]
    };

    var $e;
    beforeEach(function() {
        $e = jQuery('<span id="#test-fixture" />');
    });

    it('test date formatting, direct input', function() {
        for (var date in cases) {
            for (var i = 0; i < cases[date].length; i++) {
                var format = cases[date][i][0];
                var expected = cases[date][i][1];
                var settings = cases[date][i][2];
                var rv = jQuery.formatDateTime(
                    format, new Date(date), settings);
                expect(rv).toEqual(expected);
            }
        }
    });

    it('test date formatting in default attribute', function() {
        for (var date in cases) {
            $e.attr('data-datetime', date);
            for (var i = 0; i < cases[date].length; i++) {
                var format = cases[date][i][0];
                var expected = cases[date][i][1];
                var settings = cases[date][i][2];
                var rv = $e.formatDateTime(format, settings).text();
                expect(rv).toEqual(expected);
            }
        }
    });

    it('test date formatting in custom attribute', function() {
        var opts = {attribute: 'foo'};
        for (var date in cases) {
            $e.attr('foo', date);
            for (var i = 0; i < cases[date].length; i++) {
                var format = cases[date][i][0];
                var expected = cases[date][i][1];
                var settings = jQuery.extend({}, opts, cases[date][i][2]);
                var rv = $e.formatDateTime(format, settings).text();
                expect(rv).toEqual(expected);
            }
        }
    });

    it('test date formatting in dom content', function() {
        for (var date in cases) {
            for (var i = 0; i < cases[date].length; i++) {
                $e.text(date);
                var format = cases[date][i][0];
                var expected = cases[date][i][1];
                var settings = cases[date][i][2];
                var rv = $e.formatDateTime(format, settings).text();
                expect(rv).toEqual(expected);
            }
        }
    });

    it('test date formatting, custom AM/PM', function() {
        var opts = {ampmNames: ['FOO', 'BAR']};
        for (var date in cases) {
            for (var i = 0; i < cases[date].length; i++) {
                var format = cases[date][i][0];
                var expected = cases[date][i][1]
                    .replace('AM', 'FOO')
                    .replace('PM', 'BAR');
                var settings = jQuery.extend({}, opts, cases[date][i][2]);
                var rv = jQuery.formatDateTime(
                    format, new Date(date), settings);
                expect(rv).toEqual(expected);
            }
        }
    });

    it('test date formatting, custom AM/PM defaults', function() {
        var defaults = jQuery.extend({}, jQuery.formatDateTime.defaults);
        jQuery.formatDateTime.defaults['ampmNames'] = ['am', 'pm'];
        for (var date in cases) {
            for (var i = 0; i < cases[date].length; i++) {
                var format = cases[date][i][0];
                var expected = cases[date][i][1]
                    .replace('AM', 'am')
                    .replace('PM', 'pm');
                var settings = cases[date][i][2];
                var rv = jQuery.formatDateTime(
                    format, new Date(date), settings);
                expect(rv).toEqual(expected);
            }
        }
        jQuery.formatDateTime.defaults = defaults;
    });

    it('test date formatting, custom suffix', function() {
        var opts = {getSuffix: function(v) { return 'o'; }};
        for (var date in cases) {
            for (var i = 0; i < cases[date].length; i++) {
                var format = cases[date][i][0];
                var expected = cases[date][i][1]
                    .replace(/(\d)st/g, '$1o')
                    .replace(/(\d)nd/g, '$1o')
                    .replace(/(\d)rd/g, '$1o')
                    .replace(/(\d)th/g, '$1o');
                var settings = jQuery.extend({}, opts, cases[date][i][2]);
                var rv = jQuery.formatDateTime(
                    format, new Date(date), settings);
                expect(rv).toEqual(expected);
            }
        }
    });

    it('test attribute preference over text element', function() {
        var format = 'yy-mm-dd hh:ii:ss.u a';
        $e.attr('data-datetime', 'Mon, 09 Jul 2012 20:29:54');
        $e.text('Tue, 10 Jul 2012 20:29:54');
        var rv = $e.formatDateTime(format).text();
        expect(rv).toEqual('2012-07-09 20:29:54.0 PM');
    });

    it('test empty attribute preference over text element', function() {
        var format = 'yy-mm-dd hh:ii:ss.u a';
        $e.attr('data-datetime', '');
        $e.text('Tue, 10 Jul 2012 20:29:54');
        var rv = $e.formatDateTime(format).text();
        expect(rv).toBe('');
    });

    it('test removing attribute to prefer text element', function() {
        var format = 'yy-mm-dd hh:ii:ss.u a';
        $e.attr('data-datetime', 'Mon, 09 Jul 2012 20:29:54');
        $e.text('Tue, 10 Jul 2012 20:29:54');
        var rv = $e.formatDateTime(format).text();
        expect(rv).toEqual('2012-07-09 20:29:54.0 PM');

        $e.removeAttr('data-datetime');
        $e.text('Tue, 10 Jul 2012 20:29:54');
        rv = $e.formatDateTime(format).text();
        expect(rv).toEqual('2012-07-10 20:29:54.0 PM');
    });

    it('test data-dateformat attribute in DOM element, no format string in constructor', function() {
        for (var date in cases) {
            $e.attr('data-datetime', date);

            for (var i = 0, len = cases[date].length; i < len; i++) {
                var format = cases[date][i][0],
                    expected = cases[date][i][1],
                    settings = cases[date][i][2];

                $e.attr('data-dateformat', format);
                var rv = $e.formatDateTime(undefined, settings).text();
                expect(rv).toEqual(expected);
            }
        }
    });

    it('test preference for format string in constructor over data-dateformat attribute', function() {
        var attrDateTime = 'Mon, 09 Jul 2012 20:29:54',
            attrFormat = 'yy-mm-dd hh:ii:ss.u a',
            attrExpected = '2012-07-09 20:29:54.0 PM',
            format = 'DD, MM d, yy',
            expected = 'Monday, July 9, 2012';

        $e.attr('data-datetime', attrDateTime);

        $e.attr('data-dateformat', attrFormat);
        var rv = $e.formatDateTime().text();
        expect(rv).toEqual(attrExpected);

        rv = $e.formatDateTime(format).text();
        expect(rv).toEqual(expected);
    });

    it('test over multiple elements', function() {
        var $f = jQuery('<span id="#test-fixture-multi" />'),
            attrDateTime = 'Mon, 09 Jul 2012 20:29:54',
            attrFormatE = 'yy-mm-dd hh:ii:ss.u a',
            expectedE = '2012-07-09 20:29:54.0 PM',
            attrFormatF = 'DD, MM d, yy',
            expectedF = 'Monday, July 9, 2012';

        $e.attr('data-datetime', attrDateTime);
        $e.attr('data-dateformat', attrFormatE);

        $f.attr('data-datetime', attrDateTime);
        $f.attr('data-dateformat', attrFormatF);

        $e.add($f).formatDateTime();

        expect($e.text()).toEqual(expectedE);
        expect($f.text()).toEqual(expectedF);
    });

});
