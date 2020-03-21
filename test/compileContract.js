const test = require('tape');
const fs = require('fs');
const path = require('path');
const { compileContract } = require('../src/compileContract');


test('Compile contract', async (t) => {
  const recipientSource = fs.readFileSync(path.join(__dirname, '..', 'contracts', 'Recipient.sol'), 'utf8');

  const recipientResult = compileContract(recipientSource);
  // console.log(recipientResult.contracts['Recipient.sol']);
  t.ok(recipientResult.contract, "Compilation ok");
  t.ok(recipientResult.contract.Recipient, "Contract compiled");
  //const recipientCompiled = recipientResult.contract.Recipient;
  //console.log(`Bytecode: ${JSON.stringify(recipientCompiled.evm.bytecode.object, null, '  ')}`);
  //console.log(`Interface: ${JSON.stringify(recipientCompiled.abi)}`);

  t.end();
});
