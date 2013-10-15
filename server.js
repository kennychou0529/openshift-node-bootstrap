#!/bin/env node

(function setupTerminationHandlers() {
    // Set up termination handlers
    function terminator(sig) {
        if (typeof sig === "string") {
            console.log('%s: Received %s - terminating sample app ...', Date(Date.now()), sig);
            process.exit(1);
        }
        console.log('%s: Node server stopped.', Date(Date.now()));
    }

    process.on('exit', terminator);

    // Removed 'SIGPIPE' from the list - bugz 852598.
    ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
     'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
    ].forEach(function(element, index, array) {
        process.on(element, function() { terminator(element); });
    });
}());

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || process.argv[2] || 'localhost';
var port = process.env.OPENSHIFT_NODEJS_PORT || process.argv[3] || 3000;

app.listen(port, ipaddress, function() {
    console.log('%s: Node server started on %s:%d ...', Date(Date.now() ), ipaddress, port);
});