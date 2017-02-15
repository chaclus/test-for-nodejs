/**
 * Created by chaclus on 2016/12/9.
 */

var dns = require('dns');

// var dns = "pili-live-rtmp.live.aisoqu.com".search_dns;

dns.lookup('pili-live-rtmp.live.aisoqu.com', function (err, address, family) {

    console.log("===err===", err);
    console.log("===address===", address);
    console.log("===family===", family);
});