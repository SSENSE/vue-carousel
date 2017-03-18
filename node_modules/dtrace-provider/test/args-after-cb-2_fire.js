var d = require('../dtrace-provider');
var provider = d.createDTraceProvider('nodeapp');
provider.addProbe('after1', 'int', 'char *', 'int');
provider.enable();

function fireCb(n1, str, n2) {
    return [n1, str, n2 + 5];
}

provider.fire('after1', fireCb, 42, 'forty-two', 10);
