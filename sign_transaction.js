const test = require('tape');
const Transaction = require('ethereumjs-tx');

test('Sign transaction', async (t) => {

  const address = 'faab41ed7141e4939a516e499e5a8b6b5163144d';
  const pk = Buffer.from('f53a7a5247380eabb52f021e14a67815ce6b6966171a12d6e9533aa37364fa8f', 'hex');

  const txData = {
    nonce: '0x11',
    gasPrice: '0x04a817c800',
    gasLimit: '0x5208',
    to: '0x31483bb3cae99bf173e5f61f0c62dc398f197b81',
    value: '0x03e8',
    data: '0xc0ffee',
    chainId: 231
  };

  const tx = new Transaction(txData);
  t.ok(tx, 'Build transaction');
  t.equal(tx.r.length, 0, 'Unsigned transaction');

  tx.sign(pk);
  t.equal(tx.r.length, 32, 'Signed transaction');

  const serializedTx = tx.serialize();

  console.log(`Tx: ${serializedTx.toString('hex')}`);

  const decodedTx = new Transaction(serializedTx);

  t.ok(decodedTx.verifySignature(), 'Verify signature');
  t.equal(decodedTx.from.toString('hex'), address, 'Address from signature');

  t.end();
});
