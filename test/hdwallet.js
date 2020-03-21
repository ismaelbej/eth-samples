const test = require('tape');
const bip39 = require('bip39');
const hdkey = require('ethereumjs-wallet/hdkey');

test('Derice an HDWallet', async (t) => {
    const mnemonic = 'party box feel talent peace tiger endorse defy cheese girl tumble mail';
    const seed = await bip39.mnemonicToSeed(mnemonic);
    const path = "m/44'/60'/0'/0/0";

    const hdwallet = hdkey.fromMasterSeed(seed);
    const myWallet = hdwallet.derivePath("m/44'/60'/0'/0/0").getWallet();

    const address = myWallet.getAddressString();
    //console.log(`Address: ${address}`);
    //console.log(`Private Key: ${myWallet.getPrivateKeyString()}`)

    t.equal(address, "0x999c43b9dd689b9a0bf12ce097663857f62ffbe7", "Address");

    t.end();
});
