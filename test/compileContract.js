const test = require('tape');
const solc = require('solc');

function compileContract(source) {
  const compileInput = JSON.stringify({
    language: 'Solidity',
    sources: {
      'Source.sol': {
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
  const result = JSON.parse(solc.compile(compileInput));
  return {
    contract: result.contracts['Source.sol']
  };
}

test('Compile contract', async (t) => {
  const recipientSource = `
pragma solidity ^0.5.1;
contract Recipient {
  uint public id;
  function deposit(uint _id) public payable {
    id = _id;
  }
}`;

  const recipientResult = compileContract(recipientSource);
  // console.log(recipientResult.contracts['Recipient.sol']);
  t.ok(recipientResult.contract, "Compilation ok");
  t.ok(recipientResult.contract.Recipient, "Contract compiled");
  const recipientCompiled = recipientResult.contract.Recipient;
  //console.log(`Bytecode: ${JSON.stringify(recipientCompiled.evm.bytecode.object, null, '  ')}`);
  //console.log(`Interface: ${JSON.stringify(recipientCompiled.abi)}`);

  t.end();
});
