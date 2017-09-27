const BN = require('bn.js');

const a = new BN(1);
const b = new BN(-1);

const c = a.toTwos(256);
const d = b.toTwos(256);

console.log(`A: ${c.toString(16)}`);
console.log(`B: ${d.toString(16)}`);
