const test = require('tape');
const fs = require('fs');
const path = require('path');
const utils = require('../utils/blockchain');
const { compileContract }= require('../src/compileContract');


test('Compile, deploy and query contract', async (t) => {

  const { web3, accounts } = await utils.initChain();

  const source = fs.readFileSync(path.join(__dirname, '..', 'contracts', 'Recipient.sol'), 'utf8');

  const compiled = compileContract(source);

  t.ok(compiled, 'Contract compiled');

  const Recipient = new web3.eth.Contract(compiled.Recipient.abi);

  const toDeploy =  Recipient.deploy({
    data: `0x${compiled.Recipient.bytecode}`,
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
