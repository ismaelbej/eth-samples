const test = require('tape');
const utils = require('../utils/blockchain');

const NUM_TRANSACTIONS = 500;

test('Send many transactions', async (t) => {
  const { web3, accounts } = await utils.initChain();

  const account0 = accounts[0];
  const account1 = accounts[1];

  const start = await web3.eth.getTransactionCount(account0);

  //console.log(`Account: ${account0}`);
  //console.log(`Start: ${start}`);

  const arr = [];
  for (let i=0; i<NUM_TRANSACTIONS; ++i) {
    const hash = await new Promise((resolve, reject) => {
      web3.eth.sendTransaction({
        from: account0,
        to: account1,
        nonce: web3.utils.toHex(start + i),
        value: web3.utils.toWei((i/1000+1).toFixed(4), 'szabo')
      })
      .on('transactionHash', (hash) => {
        resolve(hash);
      });
    });
    arr.push(hash);
  }

  const first = (await web3.eth.getTransaction(arr[0])).nonce;
  const last = (await web3.eth.getTransaction(arr[arr.length-1])).nonce;

  //console.log(`First nonce: ${first}`);
  //console.log(`Last nonce: ${last}`);

  t.equal(first, start, 'First nonce should match');
  t.equal(last, start + NUM_TRANSACTIONS - 1, 'Last nonce should match');

  t.end();
});
