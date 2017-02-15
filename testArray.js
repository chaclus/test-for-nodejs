/**
 * Created by chaclus on 16/9/6.
 */

var ObjectId = require('mongodb').ObjectId;

var arr = [];
arr[0] = "aa";
arr[1] = "ab";
arr[2] = "ac";
arr[3] = "ad";
arr[4] = "ae";



for(var i =0; i<arr.length; i++) {
    if(arr[i] === "ac") {
        arr.splice(i, 1);
    }
}

arr.forEach(function (str) {
    console.log(str);
});


var id = 'aaaaaaaaaaaaaaaaaaaaaaaa';

var _id = ObjectId(id);
console.log(_id);