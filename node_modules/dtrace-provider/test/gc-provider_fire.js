var d = require('../dtrace-provider');

function mkProbe() {
    var dtp = d.createDTraceProvider("nodeapp");
    var probe = dtp.addProbe("gcprobe", "int");

    dtp.enable();

    return probe;
}

var p1 = mkProbe();

// run GC
gc();

// if the provider were GC'd, the USDT probes will be gone.
p1.fire(function() { return [ 5 ]; });
