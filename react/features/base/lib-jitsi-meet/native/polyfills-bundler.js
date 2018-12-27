// __dirname and __filename
//
// Required by:
// - lib-jitsi-meet
// - jitsi-meet-logger
if (typeof __dirname === 'undefined') {
    global.__dirname = '/';
}

if (typeof __filename === 'undefined') {
    global.__filename = '';
}
