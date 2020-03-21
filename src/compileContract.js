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
  return {
    contract: result.contracts[name]
  };
}

module.exports = {
  compileContract
};
