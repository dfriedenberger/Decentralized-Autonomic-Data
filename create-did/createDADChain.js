const didery = require('dideryjs');
const fs = require('fs');

function toHexString(byteArray) {
    return Array.from(byteArray, function(byte) {
        return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('');
}


function readDAD()
{
    var dad = fs.readFileSync('create-did/exampleDAD.dad',"ascii");  

    var i = dad.lastIndexOf("\n");
    var obj = JSON.parse(dad.substring(0,i));
    var sig = dad.substring(i+1);

    return { dad : obj , sig : sig }
}

function doRequest() {

    //resolve from 
    //https://nominatim.openstreetmap.org/reverse?format=json&lat=49.981&lon=9.276

 return {
    "licence": "Data (c) OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    "address": {
      "village": "Waldaschaff",
      "county": "Landkreis Aschaffenburg",
      "state": "Bayern",
      "postcode": "63857",
      "country": "Germany",
      "country_code": "de"
    }
  };
}



async function run() 
{

    var input = readDAD();

    var address = doRequest(input.dad.geometry.coordinate);
    

    var keypair = await didery.generateKeyPair();

    let privateKey = keypair[0];
    let publicKey = keypair[1];
  
    console.log("-- Public Key --");
    console.log(toHexString(publicKey));

    let did = await didery.makeDid(publicKey); //from public key
   
    let dad = {
        id : did,
        changed : new Date(),
        address : address,
        prior : { id : input.dad.id , sig: input.sig },
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


