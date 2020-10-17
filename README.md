Background
==========

There are a few implementations of the ideas described in the paper [“Decentralized Autonomic Data (DAD) and the three R's of Key Management”](https://github.com/WebOfTrustInfo/rebooting-the-web-of-trust-spring2018/blob/master/final-documents/DecentralizedAutonomicData.md). The examples in this repository are intended to test them out.

Example 1: Minimal DAD
======================

This example shows how to create and verify a simple DADi.

Requirements 
------------

* node
* [didery.js](https://github.com/reputage/didery.js)

Script
------
```
$ node create-did/createDADi.js
--
{
  "id": "did:dad:Yemu1RtlH0k2q2IveyQSzdfQGK5bEk4UsH1Q12qwubQ=",
  "changed": "2020-10-17T12:54:21.010Z",
  "geometry": {
    "coordinates": {
      "latitude": 52.520008,
      "longitude": 13.404954
    }
  }
}

HbihAhmA44HDY1DanHEvs2SIIWV8MQPhcCroEGBPSO_VuUk5bsFS_GXf0ze8TEbySN1P4EuVtSRz3WqEYyPRDA==
--
signature:  true
```


