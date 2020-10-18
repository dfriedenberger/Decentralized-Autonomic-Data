const { Ed25519KeyPair } = require("crypto-ld");

const didMethodKey = require("did-method-key");
const { keyToDidDoc } = didMethodKey.driver();


async function run() {

    const edKey = await Ed25519KeyPair.generate();
    console.log(edKey.fingerprint());

    const json = await edKey.export({publicKey: true});
    console.log(json);

    const doc = await keyToDidDoc(edKey);
    console.log(doc);
}
run();