/**
 * Created by chaclus on 16/9/1.
 */

var moment = require('moment');

moment.locale();
console.log(moment().format('YYYY-MM-DD HH:mm:ss'))
console.log(moment().format('LLL'));

var date = new Date();
console.log("date : " + date);
console.log("moment from now : " + moment(date).fromNow());


console.log('-1 : ' + moment().subtract(1, 'months').format('YYYY-MM-DD HH:mm:ss'));