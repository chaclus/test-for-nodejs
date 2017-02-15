
/*!(function (name, definition) {

})('EventProxy', function (debug) {


});


var st = setTimeout(function () {
    console.log("aaaaa");
}, 1000);

console.log("===", st);

var modeuls_t = require('module');
    */


var data = {
    a: 1,
    b: 2,
    c: 3
};

for(var key in data){

    console.log(key + ":" + data[key]);
}