/**
 * Created by chaclus on 16/9/20.
 */

var dateUtil = require('date-utils');

var date1 = Date.now();
var m = 3;
var n = 10;

for(var i =0;i < 10;i++) {
    console.log(Math.random()* (n -m) + m );

}

var show = function () {

    (function () {
        setTimeout(function () {
            console.log("==========");
        },1000);
    })();
    console.log("++++++++++");

};

var data = {
    a: '1',
    b: '2',
    c: '3'
};

for(var key in data) {
    console.log(key);
}

var list = ['a', 'b', 'c', 'd'];

for(var i=0;i<list.length;i++) {
    console.log(" list item : " + list[i]);
}



var date2 = Date.now();
// console.log("time : " + date2.getMilliseconds(date1));
console.log("time : " + (date2 - date1));


var str = "abcd#12345";
if(str && str.indexOf("#") > -1) {
    l = str.split("#");
}
console.log(l[0])