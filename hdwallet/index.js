const bip39 = require('bip39');
const hdkey = require('ethereumjs-wallet/hdkey');

const mnemonic = 'party box feel talent peace tiger endorse defy cheese girl tumble mail';
const seed = bip39.mnemonicToSeed(mnemonic);
const path = "m/44'/60'/0'/0/0";

const hdwallet = hdkey.fromMasterSeed(seed);
const myWallet = hdwallet.derivePath("m/44'/60'/0'/0/0").getWallet();

console.log(`Address: ${myWallet.getAddressString()}`);
console.log(`Private Key: ${myWallet.getPrivateKeyString()}`)

// 0x999C43B9DD689b9a0bF12Ce097663857f62ffbe7
// 0x999c43b9dd689b9a0bf12ce097663857f62ffbe7
