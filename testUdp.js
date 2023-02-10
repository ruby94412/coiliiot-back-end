const udp = require('dgram');
// const port = 4321;
// const address = '192.168.4.7';
const server = udp.createSocket('udp4');
const testBuffer = Buffer.from([0x01, 0x04, 0x00, 0x00, 0x00, 0x01, 0x31, 0xCA]);

server.on('message', (msg, rinfo) => {
  console.log(`server got: ${Array.apply([], msg).join(",")} from ${rinfo.address}:${rinfo.port}`);
  server.send(testBuffer, rinfo.port, rinfo.address, err => {
    if (err) {
      console.log(err);
    } else {
      console.log('reply to client succeeded');
    }
  })
});


server.bind({
  port: 4321,
  address: "192.168.4.27",
});

// const client = udp.createSocket('udp4');
// // client.connect(4321, '192.168.4.7', function(error){
// //   if(error){
// //     client.close();
// //   }else{
// //     console.log('connected --- client');
// //   }
// // });

// client.connect(4321, '192.168.4.7', () => {
//   console.log('connected client');
//   client.send("hello world", 4321, '192.168.4.7', function(error){
//     if(error){
//       console.log(error)
//       client.close();
//     }else{
//       console.log('Data sent !!!');
//     }
//   });
// });

// let sockets = [];

// const testBuffer = Buffer.from([0x01, 0x04, 0x00, 0x00, 0x00, 0x01, 0x31, 0xCA]);
// server.on('connection', function(sock) {
//     console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);
//     sockets.push(sock);
//     sock.on('data', function(data) {
//         console.log('DATA ' + sock.remoteAddress + ': ' + data);
//         // Write the data back to all the connected, the client will receive it as data from the server
//         sockets.forEach(function(sock, index, array) {
//             sock.write(testBuffer);
//         });

//       sock.destroy();
//     });
// });