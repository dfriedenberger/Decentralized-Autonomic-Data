const { Ed25519KeyPair } = require("crypto-ld");

async function run() {

    const edKey = await Ed25519KeyPair.generate();

    console.log("fingerprint",edKey.fingerprint());
    console.log("private",edKey.privateKey);
    console.log("public",edKey.publicKey);

   
}
run();