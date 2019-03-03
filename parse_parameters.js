const abi = require('ethereumjs-abi');

function parseTxParams() {
  const data = Buffer.from(`000000000000000000000000b56d622ddf60ec532b5f43b4ff9b0e7b1ff92db30000000000000000000000000000000000000000000000015af1d78b58c4000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000000`, 'hex');

  const decoded = abi.rawDecode(['address', 'uint256', 'bytes'], data);

  console.log(`Decoded: ${JSON.stringify(decoded, null, '  ')}`);

  const params = [
    '0xb56d622ddf60ec532b5f43b4ff9b0e7b1ff92db3',
    '0x15af1d78b58c40000',
    []
  ];

  const encoded = abi.rawEncode(['address', 'uint256', 'bytes'], params);

  console.log(`Encoded: ${encoded.toString('hex')}`);
}

// parseTxParams();
