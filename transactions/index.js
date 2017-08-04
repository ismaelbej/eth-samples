const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const eth = web3.eth;
const debug = web3.debug;
const miner = web3.miner;
const personal = web3.personal;
const admin = web3.admin;

const account0 = eth.accounts[0];
const start = eth.getTransactionCount(account0);

const account1 = eth.accounts[1];

console.log(`Account: ${account0}`);
console.log(`Start: ${start}`);

personal.unlockAccount(account0, "password1", 1000000);
var arr = [];
for (var i=0; i<500; ++i) {
  arr.push(eth.sendTransaction({
    from: account0,
    to: account1,
    nonce: start + i,
    value: web3.toWei((i/1000+1).toFixed(4), 'szabo')
  }));
}

console.log(`First nonce: ${eth.getTransaction(arr[0]).nonce}`);
console.log(`Last nonce: ${eth.getTransaction(arr[499]).nonce}`);

//debug.verbosity(5);
//miner.start(1);
//admin.sleepBlocks(10);
//miner.stop();
//debug.verbosity(3);
