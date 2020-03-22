const test = require('tape');
const fs = require('fs');
const path = require('path');
const abi = require('web3-eth-abi');
const { initChain } = require('../utils/blockchain');
const { compileContract }= require('../src/compileContract');


test('Events', async (t) => {
  const source = fs.readFileSync(path.join(__dirname, '..', 'contracts', 'Events.sol'), 'utf8');

  const { web3, accounts, deployContract } = await initChain();

  const compiled = compileContract(source);

  const events = await deployContract(compiled.Events.abi, compiled.Events.bytecode, { from: accounts[0] })

  t.test('Fire single event', async (t) => {
    const receipt = await events.methods.genEvent("4321", accounts[0], "2222")
      .send({ from: accounts[0], gas: "1000000" });

    t.ok(receipt.events.logTest, "Event fired")

    t.ok(receipt.events.logTest.returnValues.id, "4321", "First parameter");
    t.ok(receipt.events.logTest.returnValues.from, accounts[0], "Second parameter");
    t.ok(receipt.events.logTest.returnValues.value, "2222", "Third parameter");

    const result = await events.getPastEvents('allEvents');

    t.equal(result.length, 1, "Got one event");
    t.equal(result[0].event, "logTest", "Event fired");

    t.end();
  });

  t.test('Fire nested event', async (t) => {
    const receipt = await events.methods.pulse(123)
      .send({ from: accounts[0], gas: "1000000" });
  
    t.strictEqual(receipt.events[0].events, undefined, "Event not recognized by web3");

    t.equal(receipt.events[0].raw.topics.length, 1, "Event topics");
    t.equal(receipt.events[0].raw.topics[0], abi.encodeEventSignature("Pulse(uint256)"), "Event signature");
    t.equal(abi.decodeParameter('uint256', receipt.events[0].raw.data), '123', "Decode parameter");
  
    t.end();
  });
  
  t.end();
});

