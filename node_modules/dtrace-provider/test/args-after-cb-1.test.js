var test = require('tap').test;
var format = require('util').format;
var dtest = require('./dtrace-test').dtraceTest;

test(
    'probes where .fire() is called with arguments to pass to the callback',
    dtest(
        function() { },
        [
            'dtrace', '-Zqn',
            'nodeapp$target:::after1{ printf("%d\\n%s\\n%d\\n", arg0, copyinstr(arg1), arg2); }',
            '-c', format('node %s/args-after-cb-1_fire.js', __dirname)
        ],
        function(t, exit_code, traces) {
            t.notOk(exit_code, 'dtrace exited cleanly');
            t.equal(traces[0], '42');
            t.equal(traces[1], 'forty-two');
            t.equal(traces[2], '15');
        }
    )
);
