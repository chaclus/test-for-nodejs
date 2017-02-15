/**
 * Created by chaclus on 16/9/18.
 */

var http = require('http');

var server = http.createServer(function (req, res) {
    var j = 0;
    for(var i =0; i < 100000000; i++){
        j += 2 / 3;
    }
    res.end(j + " ");
});
server.listen(8881);
console.log('Server running at http://127.0.0.1:8881/');