const test = require('tape');
const abi = require('ethereumjs-abi');

test('Parse tx input data', async (t) => {
  const data = Buffer.from(`000000000000000000000000b56d622ddf60ec532b5f43b4ff9b0e7b1ff92db30000000000000000000000000000000000000000000000015af1d78b58c4000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000000`, 'hex');

  const decoded = abi.rawDecode(['address', 'uint256', 'bytes'], data);

  t.ok(decoded, 'Decoded input data');
  t.equal(decoded.length, 3, 'Decoded three parameters');

  t.equal(decoded[0], 'b56d622ddf60ec532b5f43b4ff9b0e7b1ff92db3', 'Address parameter');
  t.equal(decoded[1].toString(16), '15af1d78b58c40000', 'Uint256 parameter');
  t.equal(decoded[2].length, 0, 'Bytes array is empty');

  //console.log(`Decoded: ${JSON.stringify(decoded, null, '  ')}`);

  const params = [
    '0xb56d622ddf60ec532b5f43b4ff9b0e7b1ff92db3',
    '0x15af1d78b58c40000',
    []
  ];

  const encoded = abi.rawEncode(['address', 'uint256', 'bytes'], params);

  t.ok(encoded, 'Encoded parameters');
  t.equal(encoded.length, 128, 'Encoded is 128 bytes');

  //console.log(`Encoded: ${encoded.toString('hex')}`);

  t.end();
});
