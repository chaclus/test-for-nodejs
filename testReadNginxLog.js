/**
 * Created by chaclus on 2017/2/6.
 */

var fs = require('fs');
var readline = require('readline');

var rl = readline.createInterface({
    input: fs.createReadStream('./log/apiserver.log'),
    // output: process.stdout
});

var urlMap = {}, sum = 0;
rl.on('line', function(line) {
    var arr = line.split('|');
    var a = arr[10].split(' ');
    var url = a[2];
    if(url.lastIndexOf('?') > 0){
        url = url.substring(0, url.lastIndexOf('?'));
    }

    if(url.split('/').pop().length == 24) {
       url = url.substring(0, url.length - 24 -1);
    }
    if(urlMap[url]){
        urlMap[url] = urlMap[url] + 1;
    }else{
        urlMap[url] = 1;
    }

}).on('close', function() {
    console.log('finish!');

    var urlsSortArray = [];
    for(var key in urlMap) {
        sum = sum + urlMap[key];
        urlsSortArray.push({url: key, val: urlMap[key]});
    }

    urlsSortArray.sort(function (a, b) {
        if (a.val < b.val) {
            return 1;
        } else {
            return -1;
        }
    });


    console.log(urlsSortArray);
    process.exit(0);
});