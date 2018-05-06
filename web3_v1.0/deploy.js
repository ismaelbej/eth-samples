const Web3 = require('web3');
const web3 = new Web3('http://127.0.0.1:8545');

const config = require('./config');

const myContract = new web3.eth.Contract(config.eth.abi);

myContract.deploy({
  data: config.eth.bin,
})
.send({
  from: config.eth.from,
  gas: 2000000,
  gasPrice: '30000000000000',
})
.then((result) => {
  console.log(result);
});

