const test = require('tape');
const { Transaction } = require('@ethereumjs/tx');
const { default: Common } = require('@ethereumjs/common');

test('Sign transaction', async (t) => {

  const address = '0xfaab41ed7141e4939a516e499e5a8b6b5163144d';
  const pk = Buffer.from('f53a7a5247380eabb52f021e14a67815ce6b6966171a12d6e9533aa37364fa8f', 'hex');

  const common = Common.forCustomChain(
    'mainnet',
    {
      networkId: 231,
      chainId: 231,
    },
    'petersburg'
  );

  const txData = {
    nonce: '0x11',
    gasPrice: '0x04a817c800',
    gasLimit: '0x52d4',
    to: '0x31483bb3cae99bf173e5f61f0c62dc398f197b81',
    value: '0x03e8',
    data: '0xc0ffee'
  };

  let tx = Transaction.fromTxData(txData, { common });
  t.ok(tx, 'Build transaction');
  tx = tx.sign(pk);
  t.ok(tx.validate(), 'Valid transaction');

  const serializedTx = tx.serialize();

  const decodedTx = Transaction.fromRlpSerializedTx(serializedTx, { common });

  t.ok(decodedTx.validate(), 'Valid signature');
  t.equal(decodedTx.getSenderAddress().toString(), address, 'Address from signature');

  t.end();
});
