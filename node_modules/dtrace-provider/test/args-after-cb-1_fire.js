var d = require('../dtrace-provider');
var provider = d.createDTraceProvider('nodeapp');
var probe = provider.addProbe('after1', 'int', 'char *', 'int');
provider.enable();

function fireCb(n1, str2, n2) {
    return [n1, str2, n2 + 5];
}

probe.fire(fireCb, 42, 'forty-two', 10);
