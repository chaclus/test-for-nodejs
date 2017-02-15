/**
 * Created by chaclus on 2016/12/23.
 */

var IoRedis = require('ioredis');

var redis = IoRedis({
    host: '192.168.3.30',
    port: 6379,
    password: 'TUTU@live2016'
});

var io = require('socket.io-emitter')(redis);


setInterval(function () {
    var date = new Date();

    io.of("/ios").in("aaaaaaaa").emit("im", date);
    console.log("send msg : ", date);
}, 3000);
