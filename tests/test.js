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
                var rv = jQuery.formatDateTime(format, new Date(date));
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
                var rv = $e.formatDateTime(format).text();
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
                var rv = $e.formatDateTime(format, opts).text();
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
                var rv = $e.formatDateTime(format).text();
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
                var rv = jQuery.formatDateTime(format, new Date(date), opts);
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

    it('test data-format attribute in DOM element, no format string in constructor', function(){
        for (var date in cases) {
            $e.attr('data-datetime', date);

            for (var i = 0, len = cases[date].length; i < len; i++) {
                var format = cases[date][i][0],
                    expected = cases[date][i][1];

                $e.attr('data-format', format);

                var rv = $e.formatDateTime().text();
                expect(rv).toEqual(expected);
            }
        }
    });

    it('test preference for format string in constructor over data-format attribute', function(){
        var attrDateTime = 'Mon, 09 Jul 2012 20:29:54',
            attrFormat = 'yy-mm-dd hh:ii:ss.u a',
            attrExpected = '2012-07-09 20:29:54.0 PM',
            format = 'DD, MM d, yy',
            expected = 'Monday, July 9, 2012';

        $e.attr('data-datetime', attrDateTime);

        $e.attr('data-format', attrFormat);
        var rv = $e.formatDateTime().text();
        expect(rv).toEqual(attrExpected);

        rv = $e.formatDateTime(format).text();
        expect(rv).toEqual(expected);
    });

});
