const didery = require('dideryjs');

function toHexString(byteArray) {
    return Array.from(byteArray, function(byte) {
        return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('');
}


async function run() 
{

    var keypair = await didery.generateKeyPair();
    console.log("private",toHexString(keypair[0]));
    console.log("public",toHexString(keypair[1]));

}

run();