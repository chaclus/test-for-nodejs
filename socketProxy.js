/**
 * Created by chaclus on 2016/12/21.
 */
var http = require('http');
var IoRedis = require('ioredis');

var express = require('express');

var router                  = express.Router();

//http server
var app = express();
var server = http.createServer(app);
server.listen(8200);

app.use('/route', router);

//redis
var redis = IoRedis({
    host: '192.168.3.30',
    port: 6379,
    password: 'TUTU@live2016'
});


router.get('/', function (req, res, next) {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(ip);
    getServer();
    res.send('Hello World');
});


var getServer = function () {
    redis.hgetall("SOCKET_SERVER_INFO", function (err, data) {
        console.log(data)
    });
};
