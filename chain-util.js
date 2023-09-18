const EC = require('elliptic').ec;
const uuidv1 = require('uuid').v1;
const ec = new EC('secp256k1');

class ChainUtil {
  static genKeyPair() {
    return ec.genKeyPair();
  }

  static id() {
    return uuidv1();
  }
}

module.exports = ChainUtil;