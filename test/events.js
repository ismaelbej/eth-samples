const test = require('tape');
const fs = require('fs');
const path = require('path');
const { initChain } = require('../utils/blockchain');
const { compileContract }= require('../src/compileContract');


test('Events', async (t) => {
  const source = fs.readFileSync(path.join(__dirname, '..', 'contracts', 'Events.sol'), 'utf8');

  const { web3, accounts } = await initChain();

  const compiled = compileContract(source);

  const Events = new web3.eth.Contract(compiled.contract.Events.abi);

  const toDeploy =  Events.deploy({
    data: `0x${compiled.contract.Events.evm.bytecode.object}`,
    arguments: [],
  });

  const gas = await toDeploy.estimateGas();

  t.ok(gas, 'Gas calculated');

  const events = await toDeploy.send({
    from: accounts[0],
    gas: web3.utils.toHex(gas),
    gasPrice: web3.utils.toHex('30000000000')
  });

  await events.methods.genEvent("4321", accounts[0], "2222")
    .send({ from: accounts[0], gas: "1000000" });

  const result = await events.getPastEvents('allEvents');

  t.equal(result.length, 1, "Got events");

  t.end();
});
