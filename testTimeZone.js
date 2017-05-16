/**
 * Created by chaclus on 2017/3/27.
 */

/*
var x = new Date();
var offset = -x.getTimezoneOffset();
console.log((offset >= 0 ? "+" : "-") + parseInt(offset / 60) + ":" + offset % 60);
*/


var moment = require('moment');
var offset = moment().utcOffset();
console.log((offset >= 0 ? "+" : "-") + parseInt(offset / 60) + ":" + offset % 60);
