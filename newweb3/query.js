const Web3 = require('web3');
const web3 = new Web3('http://127.0.0.1:8545');

const config = require('./config');

const ethUpVotingContract = new web3.eth.Contract(config.eth.abi, config.eth.address);

const options = {
  from: config.eth.from,
  gas: 2000000,
  gasPrice: '30000000000000',
};

const message = web3.utils.asciiToHex('foo');

ethUpVotingContract.methods.addNewQuestion(message)
.send(options, (err, hash) => {
  if (err) {
    console.log(err);
  }
  console.log(`TxHash: ${hash}`);
})
.then((result) => {
  ethUpVotingContract.methods.getQuestionListSize().call()
  .then((result) => {
    console.log(result);
  });
});
