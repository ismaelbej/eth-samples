const test = require('tape');
const fs = require('fs');
const path = require('path');
const { compileContract } = require('../src/compileContract');


test('Compile contract', async (t) => {
  const recipientSource = fs.readFileSync(path.join(__dirname, '..', 'contracts', 'Recipient.sol'), 'utf8');

  const recipientResult = compileContract(recipientSource);

  t.ok(recipientResult, "Compilation ok");
  t.ok(recipientResult.Recipient, "Contract compiled");
  t.ok(recipientResult.Recipient.abi, "Contract compiled ABI");
  t.ok(recipientResult.Recipient.bytecode, "Contract compiled bytecode");

  t.end();
});
