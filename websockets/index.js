const WebSocket = require('ws');

const getUniqueId = () => {
  const s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  };
  return s4() + s4() + '-' + s4();
};

const startWebSocketServer = expressServer => {

  const wss = new WebSocket.Server({
    noServer: true,
    path: '/websockets'
  });

  expressServer.on("upgrade", (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (websocket) => {
      wss.emit("connection", websocket, request);
    });
  });

  wss.on("connection", (ws, req) => {
    ws.id = getUniqueId();
    ws.on("message", (data, isBinary) => {
      const msg = isBinary ? data : data.toString();
      const obj = {
        data: `hello ${ws.id} from server`,
        type: 'AUTOREPLY'
      }
      ws.send(JSON.stringify(obj));
      wss.clients.forEach(client => {
        if (client.id !== ws.id) {
          client.send(msg)
        }
      });
    });
  });

}

module.exports = startWebSocketServer;
