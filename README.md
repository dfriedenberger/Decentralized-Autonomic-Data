Background
==========

There are a few implementations of the ideas described in the paper [“Decentralized Autonomic Data (DAD) and the three R's of Key Management”](https://github.com/WebOfTrustInfo/rebooting-the-web-of-trust-spring2018/blob/master/final-documents/DecentralizedAutonomicData.md). The examples in this repository are intended to test them out.

Example 1: Minimal DAD
======================

Requirements 
------------

* [didery.js](https://github.com/reputage/didery.js)

Manual
------
```
$ node create-did/didery.js
did:  did:dad:nZnruUJH4A4wmOIcpO97SsiYdEjtT5VoBKUzV8RQpBA=
{
  "id": "did:dad:nZnruUJH4A4wmOIcpO97SsiYdEjtT5VoBKUzV8RQpBA=",
  "changed": "2020-10-16T20:52:44.112Z",
  "data": {
    "name": "Dirk Friedenberger",
    "nation": "Germany"
  }
}

CkoeiSoPG1wgP3_jebhGaDpdr2BXOYCcQ4tBJouqyYjQdB581Wv7UnWvuwxey1OukQX49Z_OgRir0aQ-PP9VDg==
signature = true
```

