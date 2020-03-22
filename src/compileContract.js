const solc = require('solc');

function compileContract(source, name = 'Source.sol') {
  const compileInput = JSON.stringify({
    language: 'Solidity',
    sources: {
      [name]: {
        content: source,
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
  const result = JSON.parse(solc.compile(compileInput));
  const contracts = result.contracts[name];
  return Object.keys(contracts).reduce((result, contractName) => ({
      ...result,
      [contractName]: { 
        abi: contracts[contractName].abi,
        bytecode: contracts[contractName].evm.bytecode.object,
      }
    }), {});
}

module.exports = {
  compileContract
};
