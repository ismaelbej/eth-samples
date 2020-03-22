const Web3 = require('web3');
const Ganache = require('ganache-core');

async function initChain(options = {}) {
  const provider = Ganache.provider();
  const web3 = new Web3(provider);
  provider.setMaxListeners(100);
  const accounts = await web3.eth.personal.getAccounts();
  return {
    provider,
    web3,
    accounts,
    deployContract: (abi, bytecode, arguments, options) => {
      return deployContract(web3, abi, bytecode, arguments, options);
    }
  };
}

async function deployContract(web3, abi, bytecode, arguments, options) {
  const Contract = new web3.eth.Contract(abi);

  if (typeof arguments === "undefined") {
    arguments = [];
    options = {};
  } else {
    if (typeof options === "undefined") {
      if (typeof arguments === "object") {
        options = arguments;
        arguments = [];
      } else {
        options = {};
      }
    }
  }

  const toDeploy = Contract.deploy({
    data: `0x${bytecode}`,
    arguments,
  });

  if (typeof options.gas === "undefined") {
    const gas = await toDeploy.estimateGas();
    options.gas = web3.utils.toHex(gas);
  }

  if (typeof options.gasPrice === "undefined") {
    options.gasPrice = web3.utils.toHex('30000000000');
  }

  return toDeploy.send(options);
}

module.exports = {
  initChain,
  deployContract,
};
