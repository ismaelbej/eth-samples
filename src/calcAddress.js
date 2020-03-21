const EC = require('elliptic').ec;
const keccak256 = require('js-sha3').keccak256;

function calcAddress(privateKey) {
  const ec = new EC('secp256k1');

  const key = ec.keyFromPrivate(privateKey);

  const publicKey = key.getPublic().encode('hex').slice(2);

  const address = keccak256(Buffer.from(publicKey, 'hex')).slice(64 - 40);

  return { 
    address,
    publicKey,
  };
}

module.exports = {
  calcAddress,
};
