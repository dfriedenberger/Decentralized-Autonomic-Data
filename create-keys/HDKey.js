const HDKey = require('hdkey');
const crypto = require('crypto');


var seed = crypto.randomBytes(128);
var hdkey = HDKey.fromMasterSeed(seed);

console.log("xpriv",hdkey.privateExtendedKey.toString('hex'));
console.log("xpub",hdkey.publicExtendedKey.toString('hex'));
console.log("private",hdkey.privateKey.toString('hex'));
console.log("public",hdkey.publicKey.toString('hex'));

