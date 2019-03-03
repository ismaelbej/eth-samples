const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const eth = web3.eth;

async function sendMultipleTransactions() {

  const accounts = await eth.personal.getAccounts();

  const account0 = accounts[0];
  const account1 = '0x583031d1113ad414f02576bd6afabfb302140225';

  const start = await eth.getTransactionCount(account0);

  console.log(`Account: ${account0}`);
  console.log(`Start: ${start}`);

  const arr = [];
  for (let i=0; i<500; ++i) {
    const hash = await new Promise((resolve, reject) => {
      eth.sendTransaction({
        from: account0,
        to: account1,
        nonce: start + i,
        value: web3.utils.toWei((i/1000+1).toFixed(4), 'szabo')
      })
      .on('transactionHash', (hash) => {
        resolve(hash);
      });
    });
    arr.push(hash);
  }

  console.log(`First nonce: ${(await eth.getTransaction(arr[0])).nonce}`);
  console.log(`Last nonce: ${(await eth.getTransaction(arr[499])).nonce}`);
}

// sendMultipleTransactions();
