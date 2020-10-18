Background
==========

There are a few implementations of the ideas described in the paper [“Decentralized Autonomic Data (DAD) and the three R's of Key Management”](https://github.com/WebOfTrustInfo/rebooting-the-web-of-trust-spring2018/blob/master/final-documents/DecentralizedAutonomicData.md). The examples in this repository are intended to test them out.

Example 1: Minimal DAD Item (DADi)
======================

This example shows how to create and verify a simple DADi.

Requirements 
------------

* node
* [didery.js](https://github.com/reputage/didery.js)

[Script](create-did/createDADi.js)
------
```
$ node create-did/createDADi.js
-- Public Key --
bae44234e6255a4ef76b80ee1c8c881e59717feedef7d169efefba316e862759
-- DAD Item --
{
  "id": "did:dad:uuRCNOYlWk73a4DuHIyIHllxf-7e99Fp7--6MW6GJ1k=",
  "changed": "2020-10-18T13:56:00.896Z",
  "geometry": {
    "coordinate": {
      "latitude": 52.520008,
      "longitude": 13.404954
    }
  }
}

C5dBSYrqTOwWu9D1HOkyGyWApDXXSlueAKqB339p2cWdhVKxfbfU0XLvsmB2w5j1D3pgwNvXGFTO4CG8VTpHDg==
--
signature:  true
```
Example 2: derived DID (DDID)
======================

This example shows how to create DADi with DDID (chain + sequenz number) and verify it.

Requirements 
------------

* node
* [hdkey](https://github.com/cryptocoinjs/hdkey)
* [eckey-utils](https://github.com/tibetty/eckey-utils)
* [didery.js](https://github.com/reputage/didery.js)

[Script](create-did/createDDID.js)
------
```
$ node create-did/createDDID.js
-- Public Key --
02a47fce2176ef1e89dd81aca6cef6c070aa51d280846f4c2168e7635b546c16a9
-- DDID Database --
{
  "did:dad:AzNO6h9uaTRPk0pk-7A60cEGKAE8al8bcLUoOuDHoxFK": "did:dad:AqR_ziF27x6J3YGsps72wHCqUdKAhG9MIWjnY1tUbBap?chain=0/1"
}
-- DAD Item --
{
  "id": "did:dad:AzNO6h9uaTRPk0pk-7A60cEGKAE8al8bcLUoOuDHoxFK/1603032687",
  "changed": "2020-10-18T14:51:27.758Z",
  "geometry": {
    "coordinate": {
      "latitude": 49.981,
      "longitude": 9.276
    }
  }
}

MEUCIFLHLEmOtVKRLghVk3GdSbkN0G5b0PSTNRu4T9ksJ0cgAiEA-_Cp3pMjl91GF_Y2hLW9-XMewMYCF7SK5zdEignKNng=
--
signature:  true
```
