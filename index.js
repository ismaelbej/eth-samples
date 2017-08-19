const Web3 = require('web3');
const solc = require('solc');
const web3admin = require('web3admin');

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

//web3admin.extend(web3);

const eth = web3.eth;
const debug = web3.debug;
const miner = web3.miner;
const personal = web3.personal;
const admin = web3.admin;

const account0 = eth.accounts[0];
const account1 = eth.accounts[1];

const contract = `
contract EventTest {
  event logTest(uint indexed id, address indexed from, uint value);

  function genEvent(uint _id, address _to, uint _value) public {
    logTest(_id, _to,  _value);
  }
}
`;

const output = solc.compile(contract, 1);

//console.log(output);

const contractName = ':EventTest';
const contractAddress = '0x9f85162f17ca51bf3c1fa2942c2d2048637ea5ed';

const EventTestContract = eth.contract(JSON.parse(output.contracts[contractName].interface));

//const eventTest = EventTestContract.new({from: account0, data:'0x'+output.contracts[contractName].bytecode, gas: "2000000"});

const eventTest = EventTestContract.at(contractAddress);

//console.log(eventTest);

//eventTest.genEvent.sendTransaction("4321", account0, "2222", { from:account0, gas: "1000000"});

const allEvents = eth.filter({
  fromBlock: 0,
  toBlock: 'latest',
  address: contractAddress,
  topics: ['0x7ac5878e2e51c507cf06f5ee5ec647b36e2da085e098034e84d2d79732797e23'], // 
// '0x00000000000000000000000000000000000000000000000000000000000004d2']
});

/*const allEvents = eventTest.allEvents({
  fromBlock: 0,
  toBlock: 'latest',
  topics: ['0x7ac5878e2e51c507cf06f5ee5ec647b36e2da085e098034e84d2d79732797e23', 
'0x00000000000000000000000000000000000000000000000000000000000004d2']
});*/

allEvents.get(function (err, events) {
  for (var i=0; i<events.length; ++i) {
    console.log(events[i]);
  }
});


//for (var name in output.contracts) {
//  console.log(output.contracts[name].interface);
//}

/*
const start = eth.getTransactionCount(account0);
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
*/

//debug.verbosity(5);
//miner.start(1);
//admin.sleepBlocks(10);
//miner.stop();
//debug.verbosity(3);
