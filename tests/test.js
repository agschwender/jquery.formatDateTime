var Tester = Tester || {};

Tester.run = function() {
    test('test date formatting', function() {
        var dates = {
            'Mon, 09 Jul 2012 20:29:54': [
                ['yy-mm-dd hh:ii:ss.u a', '2012-07-09 20:29:54.0 PM'],
                ['m/d/y g:ii:ss a', '7/9/12 8:29:54 PM'],
                ['DD, MM d, yy', 'Monday, July 9, 2012'],
                ['D, M d, yy', 'Mon, Jul 9, 2012']
            ],
            '2012/07/05 09:55:03': [
                ['mm/dd/y g:ii a', '07/05/12 9:55 AM'],
                ['mm/dd/y h:ii', '07/05/12 9:55'],
                ['o, yy hh:ii', '187, 2012 09:55'],
            ],
            '2012/01/01 00:00:00.000': [
                ['mm/dd/y gg:ii:ss.u a', '01/01/12 12:00:00.0 AM'],
                ['mm/dd/y hh:ii:ss.uu a', '01/01/12 00:00:00.000 AM']
            ]
        };

        for (var date in dates) {
            for (var i = 0; i < dates[date].length; i++) {
                var format = dates[date][i][0];
                var expected = dates[date][i][1];
                equal($.formatDateTime(format, new Date(date)),
                      expected,
                      'Formatting ' + date + ' as ' + format);
            }
        }
    });
};
