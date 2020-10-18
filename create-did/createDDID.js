const HDKey = require('hdkey');
const didery = require('dideryjs');
const crypto = require('crypto');
const ecKeyUtils = require('eckey-utils');
const curveName = 'secp256k1';

async function run() 
{

    //create extended key pair 
    let seed = crypto.randomBytes(128);
    let hdkey = HDKey.fromMasterSeed(seed);
    let derivedPath = "0/1"
    let derived = hdkey.derive("m/"+derivedPath);

    console.log("-- Public Key --");
    console.log(hdkey.publicKey.toString("hex"));

    // derived DID database 
    let did = await didery.makeDid(hdkey.publicKey); //from public key
    let ddid = await didery.makeDid(derived.publicKey); //from public key
    let pems = ecKeyUtils.generatePem({
        curveName,
        privateKey: derived.privateKey,
        publicKey: derived.publicKey
    });
    var database = {};
    database[ddid] = did+"?chain="+derivedPath;
    console.log("-- DDID Database --");
    console.log(JSON.stringify(database, null, 2));


    //DAD Item
    let dad = {
        id : ddid,
        changed : new Date(),
        geometry : {
            coordinate : {
                latitude : 49.981000, 
                longitude: 9.276000
            }
        }
    };
    let message = JSON.stringify(dad, null, 2);



    //sign with private key
    let sign = crypto.createSign('SHA256')
    sign.update(message);
    let signBuffer = sign.sign(pems.privateKey);
    let signature = await didery.toBase64(signBuffer);

    console.log("-- DAD Item --");
    console.log(message + "\r\n\r\n" + signature);
    console.log("--");

    
    //verify - Use only extended public key and derived path
    let publicRoot = HDKey.fromExtendedKey(hdkey.publicExtendedKey);
    let publicDerived = publicRoot.derive("m/"+derivedPath);
    let publicPems = ecKeyUtils.generatePem({
        curveName,
        publicKey: publicDerived.publicKey
    });

 
    //verify with crypto library
    let verify = crypto.createVerify('SHA256');
    verify.update(message);
    let valid = verify.verify(publicPems.publicKey, signBuffer);
    console.log('signature: ',valid);

}
run();