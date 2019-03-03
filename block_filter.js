const Web3 = require('web3');

const web3 = new Web3("ws://localhost:8546");

const addresses = [
  "0xe625785e27d8da16dc03dd238fd455606a3befab",
  "0x1f60f1911cdec6d4be65774fd49e8b6e8106be83"
];

const balances = {};

async function updateBalances() {
  const values = await Promise.all(addresses.map(address => web3.eth.getBalance(address)));
  addresses.forEach((address, idx) => {
    if (balances[address] !== values[idx]) {
      console.log(`Balance of ${address} changed: ${values[idx].toString()}`);
      balances[address] = values[idx];
    }
  });
}


async function listenBalanceChanges() {
  await updateBalances();
  const newBlocks = web3.eth.subscribe('newBlockHeaders', (err, result) => {
    if (err) {
      console.log(err);
    }
  });
  newBlocks.on("data", async (blockHeader) => {
    await updateBalances();
  });
};

// listenBalanceChanges();

