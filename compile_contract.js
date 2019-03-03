const solc = require('solc');

function compileContract() {
  const recipientCode = `
pragma solidity ^0.5.1;
contract Recipient {
  uint public id;
  function deposit(uint _id) public payable {
    id = _id;
  }
}`;

  const compileParams = JSON.stringify({
    language: 'Solidity',
    sources: {
      'Recipient.sol': {
        content: recipientCode,
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
  const recipientResult = JSON.parse(solc.compile(compileParams));
  //console.log(`${JSON.stringify(recipientResult, null, '  ')}`);
  console.log(recipientResult.contracts['Recipient.sol']);
  const recipientCompiled = recipientResult.contracts['Recipient.sol'].Recipient;
  console.log(`Bytecode: ${JSON.stringify(recipientCompiled.evm.bytecode.object, null, '  ')}`);
  console.log(`Interface: ${JSON.stringify(recipientCompiled.abi, null, ' ')}`);
}

// compileContract();
