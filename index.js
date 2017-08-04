const Web3 = require('web3');
const Promise = require('bluebird');

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const isV1 = typeof web3.version === 'string';
const getBlock = isV1 ? web3.eth.getBlock : Promise.promisify(web3.eth.getBlock);

const numBlock = 2378;

async function main() {
  try {
    const block0 = await getBlock(numBlock-1);
    console.log(`${block0.hash}`);
    const block1 = await getBlock(numBlock);
    console.log(`${block1.hash}`);
    const block2 = await getBlock(numBlock+1);
    console.log(`${block2.hash}`);
    const blocke = await getBlock(block1.hash);
    console.log(`${blocke.hash}`);
  } catch (err) {
    console.log(err);
  }
}

main();

