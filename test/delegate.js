const test = require('tape');
const fs = require('fs');
const path = require('path');
const { initChain, deployContract } = require('../utils/blockchain');
const { compileContract }= require('../src/compileContract');


test('Delegatecall opcode', async (t) => {
  const source = fs.readFileSync(path.join(__dirname, '..', 'contracts', 'Delegate.sol'), 'utf8');

  const { web3, accounts } = await initChain();

  const compiled = compileContract(source);

  const a = await deployContract(web3, compiled.contract.A.abi, compiled.contract.A.evm.bytecode.object, { from: accounts[0] });
  //console.log(a.options.address);

  const b = await deployContract(web3, compiled.contract.B.abi, compiled.contract.B.evm.bytecode.object, { from: accounts[0] });
  //console.log(b.options.address);

  const c = await deployContract(web3, compiled.contract.C.abi, compiled.contract.C.evm.bytecode.object, { from: accounts[0] });
  //console.log(c.options.address);

  const [origA, origB, origC] = await Promise.all([
    a.methods.value().call({ from: accounts[0] }),
    b.methods.value().call({ from: accounts[0] }),
    c.methods.value().call({ from: accounts[0] }),
  ]);

  t.equal(origA.toString(10), "0");
  t.equal(origB.toString(10), "0");
  t.equal(origC.toString(10), "0");

  await a.methods.setValue(23).send({ from: accounts[0] });

  t.equal((await a.methods.value().call({ from: accounts[0] })).toString(10), "23");
 
  await b.methods.jump(a.options.address, 12).send({ from: accounts[0] });

  t.equal((await b.methods.value().call({ from: accounts[0] })).toString(10), "12");

  await c.methods.setValue(31).send({ from: accounts[0] });

  t.equal((await c.methods.value().call({ from: accounts[0] })).toString(10), "31");

  await c.methods.foo(b.options.address, a.options.address, 42).send({ from: accounts[0] });

  const [modA, modB, modC] = await Promise.all([
    a.methods.value().call({ from: accounts[0] }),
    b.methods.value().call({ from: accounts[0] }),
    c.methods.value().call({ from: accounts[0] }),
  ]);

  t.equal(modA.toString(10), "23");
  t.equal(modB.toString(10), "12");
  t.equal(modC.toString(10), "42");

  t.end();
});