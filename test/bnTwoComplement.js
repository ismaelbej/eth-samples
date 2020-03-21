const test = require('tape');
const BN = require('bn.js');

test('Uint two\'s complement', async (t) => {
  const a = new BN(1);
  const b = new BN(-1);

  const c = a.toTwos(256);
  const d = b.toTwos(256);

  t.equal(c.toString(16, 64), '0000000000000000000000000000000000000000000000000000000000000001', 'Positive two\'s complement');
  t.equal(d.toString(16, 64), 'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff', 'Negative two\'s complement');

  //console.log(`A: ${c.toString(16, 64)}`);
  //console.log(`B: ${d.toString(16, 64)}`);

  t.end();
});
