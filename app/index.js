const express = require('express');
const Blockchain = require('../blockchain');

const PORT = process.env.PORT || 3000;

const app = express();
const bc = new Blockchain();

app.use(express.json());

app.get('/blocks', (req, res) => {
  res.json(bc.chain);
});

app.post('/mine', (req, res) => {
  const block = bc.addBlock(req.body.data);
  console.log(`New block added: ${block.toString()}`);
  
  // res.redirect('/blocks'); //redirects to the '/blocks' route
  res.status(201).json(bc.chain[bc.chain.length-1]);
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));