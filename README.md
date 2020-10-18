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

This example shows how to create DADi with DDID and verify it.

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
02bb20f89f1db2a0824e84ed912d6a0f3d94530e7cbd4a90d250ee52d22a66b5ab
-- DDID Database --
{
  "did:dad:A2Mag8a_qz0SDTFhhkOp2HCie3ZDnc3Gysv9ce7NZB3t": "did:dad:Arsg-J8dsqCCToTtkS1qDz2UUw58vUqQ0lDuUtIqZrWr?chain=0/1"
}
-- DAD Item --
{
  "id": "did:dad:A2Mag8a_qz0SDTFhhkOp2HCie3ZDnc3Gysv9ce7NZB3t",
  "changed": "2020-10-18T14:07:45.219Z",
  "geometry": {
    "coordinate": {
      "latitude": 49.981,
      "longitude": 9.276
    }
  }
}

MEYCIQDHnXk3zmNg0pdnO30g_LJCY1DLZwbUkl4n42jWI5SWkQIhAI0MyG1sm6u_jM_117dyzoF8t1OhvbqWxJt4KhO3LYrV
--
signature:  true
```
