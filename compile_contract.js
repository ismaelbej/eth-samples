const solc = require('solc');

function compileContract() {
  const recipientCode = `
pragma solidity ^0.4.11;
contract Recipient {
  uint public id;
  function deposit(uint _id) public payable {
    id = _id;
  }
}`;

  const recipientResult = solc.compile(recipientCode, 1);
  //console.log(`${JSON.stringify(recipientResult, null, '  ')}`);
  const recipientCompiled = recipientResult.contracts[':Recipient'];
  console.log(`Bytecode: ${recipientCompiled.bytecode}`);
  console.log(`Interface: ${recipientCompiled.interface}`);
}

compileContract();
