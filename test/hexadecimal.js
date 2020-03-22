const test = require('tape');
const fs = require('fs');
const path = require('path');
const { initChain, deployContract } = require('../utils/blockchain');
const { compileContract }= require('../src/compileContract');

test("Hexadecimal conversion", async (t) => {
  const source = fs.readFileSync(path.join(__dirname, '..', 'contracts', 'Hexadecimal.sol'), 'utf8');

  const { web3, accounts } = await initChain();

  const compiled = compileContract(source);

  const hexadecimal = await deployContract(web3, compiled.Hexadecimal.abi, compiled.Hexadecimal.bytecode, { from: accounts[0] });

  const input = '393ebb634e9a8913f72442cc158dcd1d0d27aa86ba34f1a5c5513a7562f8dbe5';

  const result = await hexadecimal.methods.toHexa(`0x${input}`).call({ from: accounts[0] });

  t.equal(result, input, 'Output should match input');

  const str = await hexadecimal.methods.fromHexa(input).call({ from: accounts[0] });

  t.equal(str.toString(16), `0x${input}`, 'Output should match input');

  t.end();
});
