const wallet = require('ethereumjs-wallet');
const Transaction = require('ethereumjs-tx');

const myWallet = wallet.generate();

const txData = {
  nonce: '0x00',
  gasPrice: '0x04a817c800',
  gasLimit: '0x5208',
  to: '0x31483bb3cae99bf173e5f61f0c62dc398f197b81',
  value: '0x03e8',
  data: '0x',
  chainId: 3
};

const tx = new Transaction(txData);

tx.sign(myWallet.getPrivateKey());

const serializedTx = tx.serialize();

console.log(`Tx: ${serializedTx.toString('hex')}`);

const tx2 = new Transaction(serializedTx);

console.log(`Verified: ${tx2.verifySignature() ? 'yes' : 'no'}`);

console.log(tx2.value);
console.log(tx2.to);
console.log(tx2.gasPrice);
console.log(tx2.gasLimit);
console.log(tx2.data);
console.log(tx2._chainId);

console.log(`Address: ${myWallet.getAddressString()}`);
console.log(`Private Key: ${myWallet.getPrivateKeyString()}`)
