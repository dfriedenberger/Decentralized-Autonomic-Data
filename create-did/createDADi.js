const didery = require('dideryjs');

async function run() 
{

    var keypair = await didery.generateKeyPair();

    let privateKey = keypair[0];
    let publicKey = keypair[1];
  
    let did = await didery.makeDid(publicKey); //from public key

    let dad = {
        id : did,
        changed : new Date(),
        geometry : {
            coordinates : {
                latitude : 52.520008,
                longitude: 13.404954
            }
        }
    };

    let message = JSON.stringify(dad, null, 2);
    let signature = await didery.signResource(message, privateKey);

    console.log("--");
    console.log(message + "\r\n\r\n" + signature);
    console.log("--");

    //test signature
    let sigbuffer = await didery.fromBase64(signature)
    let valid = await didery.verify(sigbuffer, message, publicKey);
    console.log('signature: ',valid);

}
run();