const test = require('tape');
const solc = require('solc');
const utils = require('../utils/blockchain');

const recipientSource = `
pragma solidity ^0.5.1;
contract Recipient {
  uint public id;
  constructor() public {}
  function deposit(uint _id) public payable {
    id = _id;
  }
}`;

function compileContract(source, name) {
  const compileParams = JSON.stringify({
    language: 'Solidity',
    sources: {
      'Contract.sol': {
        content: source,
      }
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['abi', 'evm.bytecode'],
        }
      }
    }
  });

  const compiled = solc.compile(compileParams);

  const result = JSON.parse(compiled);
  const contract = result.contracts['Contract.sol'][name];
  return {
    bytecode: contract.evm.bytecode.object,
    interface: contract.abi,
  };
}

test('Compile, deploy and query contract', async (t) => {
  const { web3, accounts } = await utils.initChain();

  const compiled = compileContract(recipientSource, 'Recipient');

  t.ok(compiled, 'Contract compiled');

  const Recipient = new web3.eth.Contract(compiled.interface);

  const toDeploy =  Recipient.deploy({
    data: `0x${compiled.bytecode}`,
    arguments: [],
  });

  const gas = await toDeploy.estimateGas();

  t.ok(gas, 'Gas calculated');

  //console.log(`Gas: ${gas}`);

  let receipt;
  const recipient = await toDeploy.send({
    from: accounts[0],
    gas: web3.utils.toHex(gas),
    gasPrice: web3.utils.toHex('30000000000')
  })
  .on('receipt', r => receipt = r);

  t.ok(recipient && receipt.status, 'Contract deployed');

  //console.log(`Deployed at: ${recipient.options.address}`);
  //console.log(`ABI: ${JSON.stringify(compiled.interface)}`);
  //console.log(`Gas used: ${web3.utils.toBN(receipt.gasUsed).toString()}`);

  receipt = await recipient.methods.deposit(4321)
  .send({
    from: accounts[0],
    value: 1000
  });

  t.ok(receipt.status, 'Execute method');

  const result = await recipient.methods.id().call();

  t.ok(result, 'Query contract');
  //console.log(`Result: ${result}`);

  t.end();
});
