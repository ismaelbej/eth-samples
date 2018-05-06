const assert = require('assert');
const EC = require('elliptic').ec;
const keccak256 = require('js-sha3').keccak256;

async function main() {
  try {
    const ec = new EC('secp256k1');

    const key = ec.keyFromPrivate('208065a247edbe5df4d86fbdc0171303f23a76961be9f6013850dd2bdc759bbb', 'hex');

    const privateKey = key.getPrivate();
    const publicKey = key.getPublic().encode('hex').slice(2);
    assert.equal(publicKey, '836b35a026743e823a90a0ee3b91bf615c6a757e2b60b9e1dc1826fd0dd16106f7bc1e8179f665015f43c6c81f39062fc2086ed849625c06e04697698b21855e');

    const address = keccak256(Buffer.from(publicKey, 'hex')).slice(64 - 40);
    assert.equal(address, '0bed7abd61247635c1973eb38474a2516ed1d884');

    console.log(`Private Key: 0x${privateKey}`);
    console.log(`Public Key: 0x${publicKey}`);
    console.log(`Address: 0x${address.toString()}`);
  } catch (err) {
    console.log(err);
  }
}

main();

