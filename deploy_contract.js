const Web3 = require('web3');
const solc = require('solc');

const web3 = new Web3("http://localhost:8545");

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

async function deployQueryContract() {
  const compiled = compileContract(recipientSource, 'Recipient');

  const accounts = await web3.eth.personal.getAccounts();

  const Recipient = new web3.eth.Contract(compiled.interface);

  const toDeploy =  Recipient.deploy({
    data: `0x${compiled.bytecode}`,
    arguments: [],
  });

  const gas = await toDeploy.estimateGas();

  console.log(`Gas: ${gas}`);

  let receipt;
  const recipient = await toDeploy.send({
    from: accounts[0],
    gas: web3.utils.toHex(gas),
    gasPrice: web3.utils.toHex('30000000000')
  })
  .on('receipt', r => receipt = r);

  console.log(`Deployed at: ${recipient.options.address}`);
  console.log(`ABI: ${JSON.stringify(compiled.interface)}`);
  console.log(`Gas used: ${web3.utils.toBN(receipt.gasUsed).toString()}`);

  await recipient.methods.deposit(4321)
  .send({
    from: accounts[0],
    value: 1000
  });

  const result = await recipient.methods.id().call();
  console.log(`Result: ${result}`);
}

// deployQueryContract();
