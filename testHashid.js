/**
 * Created by chaclus on 2017/2/22.
 */
var moment = require('moment');
var Hashids = require('hashids');
var hashids = new Hashids("tutulive_deepay");

var createShortId = function () {
    var num = new Array(8);
    var c;
    for(var i=0; i<8;i++) {
        num[i] = Math.floor(Math.random() * 9 + (i==0 ? 1: 0) );
        c = num[i];
        for(var j =0; j < i; j++) {
            if(num[j] == c) {
                i--;
                break
            }
        }
    }
    return num.toString().replace(/,/g, '');
};

/*
for(var i=0;i<100000;i++) {
    var order_no = moment().format("YYMMDDhhmm") + (Array(5).join(0) + Math.floor(Math.random() * 100000)).slice(-5);
    var id = hashids.encodeHex(order_no + createShortId());
    console.log("id : " + id + ", len: " + id.length);
}
*/



var data = hashids.decodeHex('ajqqZDDKnECJewvKQ');
console.log("data :: ", data);
