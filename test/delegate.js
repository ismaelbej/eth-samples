const test = require('tape');
const fs = require('fs');
const path = require('path');
const { initChain, deployContract } = require('../utils/blockchain');
const { compileContract }= require('../src/compileContract');


test('Delegatecall opcode', async (t) => {
  const source = fs.readFileSync(path.join(__dirname, '..', 'contracts', 'Delegate.sol'), 'utf8');

  const { web3, accounts } = await initChain();

  const compiled = compileContract(source);

  const a = await deployContract(web3, compiled.A.abi, compiled.A.bytecode, { from: accounts[0] });
  //console.log(a.options.address);

  const b = await deployContract(web3, compiled.B.abi, compiled.B.bytecode, { from: accounts[0] });
  //console.log(b.options.address);

  const c = await deployContract(web3, compiled.C.abi, compiled.C.bytecode, { from: accounts[0] });
  //console.log(c.options.address);

  const [origA, origB, origC] = await Promise.all([
    a.methods.value().call({ from: accounts[0] }),
    b.methods.value().call({ from: accounts[0] }),
    c.methods.value().call({ from: accounts[0] }),
  ]);

  t.equal(origA.toString(10), "0", "Initial value");
  t.equal(origB.toString(10), "0", "Initial value");
  t.equal(origC.toString(10), "0", "Initial value");

  await a.methods.setValue(23).send({ from: accounts[0] });

  t.equal((await a.methods.value().call({ from: accounts[0] })).toString(10), "23", "Only A was modified");
 
  await b.methods.jump(a.options.address, 12).send({ from: accounts[0] });

  t.equal((await b.methods.value().call({ from: accounts[0] })).toString(10), "12", "Only B was modified");

  await c.methods.setValue(31).send({ from: accounts[0] });

  t.equal((await c.methods.value().call({ from: accounts[0] })).toString(10), "31", "Only C was modified");

  await c.methods.foo(b.options.address, a.options.address, 42).send({ from: accounts[0] });

  const [modA, modB, modC] = await Promise.all([
    a.methods.value().call({ from: accounts[0] }),
    b.methods.value().call({ from: accounts[0] }),
    c.methods.value().call({ from: accounts[0] }),
  ]);

  t.equal(modA.toString(10), "23", "Final value");
  t.equal(modB.toString(10), "12", "Final value");
  t.equal(modC.toString(10), "42", "Final value");

  t.end();
});