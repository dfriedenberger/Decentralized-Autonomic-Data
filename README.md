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
03f3fc318790a5ea13d6c0801420126aa7319748f0e3e00d01fe5777ed6ea7412b
-- DDID Database --
{
  "did:dad:A_P8MYeQpeoT1sCAFCASaqcxl0jw4-ANAf5Xd-1up0Er?chain=0/1": "did:dad:Al_OruFr4r9o3ouj4pEqzsC_dKgSOrlc_97k97viLxbc"
}
-- DAD Item --
{
  "id": "did:dad:Al_OruFr4r9o3ouj4pEqzsC_dKgSOrlc_97k97viLxbc",
  "changed": "2020-10-18T13:56:35.537Z",
  "geometry": {
    "coordinate": {
      "latitude": 49.981,
      "longitude": 9.276
    }
  }
}

MEYCIQDYZiHCpx24PiWBt7mc6d-OVRPQC3eTbctKZCcx_VKiVgIhALpFwL12u-HTeRzB1B7kJuVMsmy5OMALpsSExR6tMpyu
--
signature:  true
```
