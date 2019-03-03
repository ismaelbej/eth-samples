const Web3 = require('web3');

const web3 = new Web3('http://localhost:8545');

async function queryContract() {
  const ContractABI = [{"constant":true,"inputs":[],"name":"id","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"}],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"}];
  const ContractAddress = '0xdAaB123Fe29F5B9282268901a393B6Ee07f3b9ac';

  const Contract = new web3.eth.Contract(ContractABI, ContractAddress);

  const id = await Contract.methods.id().call();

  console.log(`Result: ${id.toString(16)}`);
}

// queryContract();
