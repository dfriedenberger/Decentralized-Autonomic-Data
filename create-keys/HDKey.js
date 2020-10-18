const HDKey = require('hdkey');
const crypto = require('crypto');


var seed = crypto.randomBytes(128);
var hdkey = HDKey.fromMasterSeed(seed);

console.log("xpriv",hdkey.privateExtendedKey.toString('hex'));
console.log("xpub",hdkey.publicExtendedKey.toString('hex'));
console.log("private",hdkey.privateKey.toString('hex'));
console.log("public",hdkey.publicKey.toString('hex'));

var derived = hdkey.derive("m/0'");

var a = hdkey.derive("m/0'/4711");
var b = HDKey.fromExtendedKey(derived.publicExtendedKey).derive("m/4711");

console.log("a.pub",a.publicExtendedKey.toString('hex'));
console.log("b.pub",b.publicExtendedKey.toString('hex'));
