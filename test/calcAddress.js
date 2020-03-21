const test = require('tape');
const { calcAddress } = require('../src/calcAddress');

test('Derive address from private key', async (t) => {
  const { address, publicKey } = calcAddress(Buffer.from('208065a247edbe5df4d86fbdc0171303f23a76961be9f6013850dd2bdc759bbb', 'hex'));

  t.equal(publicKey, '836b35a026743e823a90a0ee3b91bf615c6a757e2b60b9e1dc1826fd0dd16106f7bc1e8179f665015f43c6c81f39062fc2086ed849625c06e04697698b21855e', 'Public key');

  t.equal(address, '0bed7abd61247635c1973eb38474a2516ed1d884', 'Address');

  t.end();
});
