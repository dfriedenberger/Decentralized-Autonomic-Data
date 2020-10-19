const fs = require('fs');
const HDKey = require('hdkey');
const didery = require('dideryjs');
const crypto = require('crypto');
const ecKeyUtils = require('eckey-utils');
const curveName = 'secp256k1';

//create extended key pair 
let ownkey = HDKey.fromMasterSeed(crypto.randomBytes(128));
let partnerkey = HDKey.fromMasterSeed(crypto.randomBytes(128)); 

function processPipe(cipher,input,output) {
    return new Promise(function (resolve) {
        input.pipe(cipher).pipe(output).on('close', ()=> {
            resolve();
        });
    });
}



function hash(hashfunc,input) {
    return new Promise(function (resolve) {

        input.on('end', function() {
            hashfunc.end();
            resolve(hashfunc.read()); 
        });

        input.pipe(hashfunc);
    });
}

async function run() {

    const ec = crypto.createECDH(curveName);
    ec.setPrivateKey(ownkey.privateKey);

    //Create secret with Diffie Hellman
    var secret = ec.computeSecret(partnerkey.publicKey);

    // Encrypt file
    const ENC_KEY = Buffer.from(secret,'hex'); // set random encryption key, Buffer 32
    const IV = crypto.randomBytes(16); // set random initialisation vector Buffer 16
    //console.log("ENC_KEY",ENC_KEY.toString('hex'));
    //console.log("IV",IV.toString('hex'));

    let cipher = crypto.createCipheriv('aes-256-cbc', ENC_KEY, IV);
    const input = fs.createReadStream('create-did/message.txt'); //"text/plain";
    const output = fs.createWriteStream('tmp/message.txt.enc');

    await processPipe(cipher,input,output);

    // Creating hash of input file
    const sha256hash = crypto.createHash('sha256'); 
    sha256hash.setEncoding('hex');

    const rawinput = fs.createReadStream('create-did/message.txt'); 
    var sha256raw = await hash(sha256hash,rawinput);


    const sha256hash1 = crypto.createHash('sha256'); 
    sha256hash1.setEncoding('hex');

    const encinput = fs.createReadStream('tmp/message.txt.enc'); 
    var sha256enc = await hash(sha256hash1,encinput);

    //create DAD Item

    let did = await didery.makeDid(ownkey.publicKey); //from public key

    let pems = ecKeyUtils.generatePem({
        curveName,
        privateKey: ownkey.privateKey,
        publicKey: ownkey.publicKey
    });
  
    let dad = {
        id : did,
        changed : new Date(),
        payload : [{
            "file" : "message.txt.enc",
            "content-type" : "text/plain",
            "iv" : IV.toString('hex'),
            "sha256" : sha256enc
        }]
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





    //Decrypt
    const ec2 = crypto.createECDH(curveName);
    ec2.setPrivateKey(partnerkey.privateKey);

    //Create secret with Diffie Hellman
    var secret2 = ec2.computeSecret(ownkey.publicKey);

    // Encrypt file
    const ENC_KEY2 = Buffer.from(secret2,'hex'); // set random encryption key, Buffer 32
    let decipher = crypto.createDecipheriv('aes-256-cbc',ENC_KEY2, IV);

    const input2 = fs.createReadStream('tmp/message.txt.enc'); 
    const output2 = fs.createWriteStream('tmp/message.txt.dec');

    await processPipe(decipher,input2,output2);

    // Creating hash of input file
    const sha256hash2 = crypto.createHash('sha256'); 
    sha256hash2.setEncoding('hex');

    const decinput = fs.createReadStream('tmp/message.txt.dec'); 
    var sha256dec = await hash(sha256hash2,decinput);

    console.log("message.txt\t",sha256raw);
    console.log("message.txt.enc\t",sha256enc);
    console.log("message.txt.dec\t",sha256dec+ " (equal:" + (sha256raw === sha256dec)+")");

};

run();
