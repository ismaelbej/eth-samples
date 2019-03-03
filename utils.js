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
  };
}

module.exports = {
  initChain,
};
