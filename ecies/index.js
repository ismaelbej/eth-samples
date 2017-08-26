/*
	

I started this blog for generation of the keys. Which I'm able to follow successfully. My generated Private, public key and the address is mentioned in the testIdentity variable in the code below.

Now, I want to use this code ex for encryption/decryption of the data.

Everything seems fine till here. But, when I tried the Ethereum key-pair for the encryption/decryption of data generated using this, I am getting an issue. Below is the code and the issue I'm facing.
*/
var bitcore = require('bitcore-lib');
var ECIES = require('bitcore-ecies');
var message = "foobar";

var testIdentity= {
            type: 'ethereum',
            display: '0xedc8774555d634ec3cdc755296382d572de2a492',
            privateKey: '1d71471e33462a2484cd828643da29f2f643e2f55f6922c16c9a9df2982f408c',
            publicKey: '04644c70f5c80c0e0d950659fc3a5ca3e4079072af5b89bdc3d74bf4c43cda5202d294070d3712dc15a1667f1be8541ea5d587b9c041670ce351d031e5c9df563d',
            foreign: false
        };


    /**
     * encrypt the message with the publicKey of identity
     * @param  {{privateKey: ?string, publicKey: string}} identity
     * @param  {string} message
     * @return {string}
     */
    var pkiEncrypt = function(identity, message) {

        /*
         * this key is used as false sample, because bitcore would crash when alice has no privateKey
         */
        var privKey = new bitcore.PrivateKey('1d71471e33462a2484cd828643da29f2f643e2f55f6922c16c9a9df2982f408c');
          console.log("private key=>" + privKey);
        var alice = ECIES().privateKey(privKey).publicKey(new bitcore.PublicKey(identity.publicKey));
        console.log("Alice's public key=>" + alice);
        var encrypted = alice.encrypt(message);
        console.log("encrypted message by public key of Alice=>"+ encrypted.toString('hex'));

        return encrypted.toString('hex');
    };

    /**
     * decrypt the message with the privateKey of identity
     * @param  {{privateKey: ?string, publicKey: string}}   identity
     * @param  {string}   encrypted
     * @return {string}   message
     */
    var pkiDecrypt = function(identity, encrypted) {
        var privKey = new bitcore.PrivateKey(identity.privateKey);
        console.log("Alice Private key=> " + privKey);
        var alice = ECIES().privateKey(privKey);
        console.log("Allice private key again=>" + alice);
        var decryptMe = new Buffer(encrypted, 'hex');
        console.log("encrypted message=>" + decryptMe);
        var decrypted = alice.decrypt(decryptMe);
        console.log("final decrypted message=>"+decrypted.toString('ascii'));
        return decrypted.toString('ascii');
    };


var enc = pkiEncrypt(testIdentity, message);
var dec = pkiDecrypt(testIdentity, enc);

if (dec!=message) {
  console.log("failure");
} else{
  console.log("Success");
}

