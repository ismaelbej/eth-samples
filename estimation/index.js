const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const contractAbi = [{"constant":true,"inputs":[],"name":"id","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"}],"name":"deposit","outputs":[],"payable":true,"type":"function"}];
const contractAddress = '0xa4d6ad227cde3ff0c7dcc7490710f8626cfab2b7';

const contract = web3.eth.contract(contractAbi);
const contractInstance = contract.at(contractAddress);

const gas = contractInstance.deposit.estimateGas(0x12341234);

console.log(`Gas estimation: ${gas}`);
