const didery = require('dideryjs');

function toHexString(byteArray) {
    return Array.from(byteArray, function(byte) {
        return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('');
}


async function run() 
{

    var keypair = await didery.generateKeyPair();

    let privateKey = keypair[0];
    let publicKey = keypair[1];
  
    console.log("-- Public Key --");
    console.log(toHexString(publicKey));

    let did = await didery.makeDid(publicKey); //from public key
   
    let dad = {
        id : did,
        changed : new Date(),
        geometry : {
            coordinate : {
                latitude : 52.520008,
                longitude: 13.404954
            }
        }
    };

    let message = JSON.stringify(dad, null, 2);
    let signature = await didery.signResource(message, privateKey);

    console.log("-- DAD Item --");
    console.log(message + "\r\n\r\n" + signature);
    console.log("--");

    //test signature
    let sigbuffer = await didery.fromBase64(signature)
    let valid = await didery.verify(sigbuffer, message, publicKey);
    console.log('signature: ',valid);

}
run();