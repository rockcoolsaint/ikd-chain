const websocket = require('ws');

const P2P_PORT = process.env.P2P || 5001;
const peers = process.env.PEERS ? process.env.PEERS.split('.') : [];

class P2pServer {
  constructor(blockchain) {
    this.blockchain = blockchain;
    this.sockets = [];
  }

  listen() {
    const server = new websocket.Server({ port: P2P_PORT });
    server.on('connection', socket => this.connectSocket(socket));
    console.log(`Listening for peer-to-peer connections on: ${P2P_PORT}`)
  }

  connectSocket(socket) {
    this.sockets.push(socket);
    console.log('Socket connected');
  }
}

