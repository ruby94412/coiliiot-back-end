const net = require('net');
const port = 1234;
const host = '192.168.4.7';
const server = net.createServer();
server.listen(port, host, () => {
    console.log('TCP Server is running on port ' + port +'.');
});
let sockets = [];

const testBuffer = Buffer.from([0x01, 0x04, 0x00, 0x00, 0x00, 0x01, 0x31, 0xCA]);
server.on('connection', function(sock) {
    console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);
    sockets.push(sock);
    sock.on('data', function(data) {
        console.log('DATA ' + sock.remoteAddress + ': ' + Array.apply([], data).join(","));
        // Write the data back to all the connected, the client will receive it as data from the server
        sockets.forEach(function(sock, index, array) {
            sock.write(testBuffer);
        });
    //   sock.destroy();
    });
});

setInterval(() => {
    console.log('asdfasdf')
    sockets.forEach(function(sock, index, array) {
        console.log(index);
        sock.write(testBuffer);
    });
}, 20000);

