const express = require('express');
const Blockchain = require('../blockchain');
const Wallet = require('../wallet');
const TransactionPool = require('../wallet/transaction-pool');
const Miner = require('./miner');
const P2pServer = require('./p2p-server');

const PORT = process.env.PORT || 3000;

const app = express();
const bc = new Blockchain();
const wallet = new Wallet();
const tp = new TransactionPool();
const p2pServer = new P2pServer(bc, tp);
const miner = new Miner(bc, tp, wallet, p2pServer);

app.use(express.json());

app.get('/blocks', (req, res) => {
  res.json(bc.chain);
});

app.post('/mine', (req, res) => {
  const block = bc.addBlock(req.body.data);
  console.log(`New block added: ${block.toString()}`);

  p2pServer.syncChains();
  
  // res.redirect('/blocks'); //redirects to the '/blocks' route
  res.status(201).json(bc.chain[bc.chain.length-1]);
});

app.get('/transactions', (req, res) => {
  res.json(tp.transactions);
})

app.post('/transact', (req, res) => {
  const { recipient, amount } = req.body;
  const transaction = wallet.createTransaction(recipient, amount, bc, tp);
  p2pServer.broadcastTransaction(transaction);
  res.redirect('/transactions');
});

app.get('/mine-transactions', (req, res) => {
  const block = miner.mine();
  console.log(`New block added: ${block.toString()}`);
  res.redirect('/blocks');
})

app.get('/public-key', (req, res) => {
  res.json({publicKey: wallet.publicKey});
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
p2pServer.listen();