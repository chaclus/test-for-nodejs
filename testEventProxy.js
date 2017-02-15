/**
 * Created by chaclus on 16/9/1.
 */
var EventProxy = require("eventproxy");


var ep = new EventProxy();
ep.fail( function (err) {
    console.log(err);
});


ep.on("hello", function () {
    console.log("====2====");
    console.log("hello");
    ep.emit("end");
});

ep.on("end", function () {
    console.log("====3====");
    console.log("end");
});
for(var i = 0; i < 10; i++){
    console.log(i);
    if(i==5) {
        console.log("====1====");
        ep.emit("hello");
        break;
    }
}


var a = 10;
var b = 3;
var c = a % b;
if( c > 0) {
    console.log("余数是: " + c);
}
console.log(a % b);

var d = Math.floor(8 / b);
console.log("取整: " + d);



