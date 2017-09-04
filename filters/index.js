const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

//const address = "0x65be9164cb4775511534796da049d3eb2065b618";
const address = "0x9bc62fa8c8925a18441506e4d2407e78fae369b4";

let balance = web3.eth.getBalance(address);

const options = 'latest';

const filter = web3.eth.filter(options);

filter.watch((err, res) => {
  if (err) {
    console.log(`Watch error: ${err}`);
  } else {
    web3.eth.getBalance(address, (err, bal) => {
      if (err) {
        console.log(`getBalance error: ${err}`);
      } else {
        balance = bal;
        console.log(`Update balance [${address}]: ${web3.fromWei(balance, "ether")}`);
      }
    });
  }
});

console.log(`Balance [${address}]: ${web3.fromWei(balance, "ether")}`);

