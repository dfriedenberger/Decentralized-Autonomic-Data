const curveName = 'secp256k1';
const crypto = require('crypto');


const ecKeys = crypto.createECDH(curveName);
const publicKey = ecKeys.generateKeys();

console.log("publicKey",publicKey);

