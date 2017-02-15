/**
 * Created by chaclus on 2016/12/21.
 */


var IoRedis = require('ioredis');


//redis
var redis = IoRedis({
    host: '192.168.3.30',
    port: 6379,
    password: 'TUTU@live2016'
});


var serverInfoUp = function (server_name, port, num) {
    redis.hset('PROXY_SOCKET_REDIS', server_name, JSON.stringify({
        name: server_name,
        host: '127.0.0.1:600' + num,
        socket_num: num,
        status: 1,
        version: "v1.3",
        cluster: "cluster_" + (num % 2)
    }));
};

for(var i=0;i < 10;i++) {
    serverInfoUp("server_name_" + i, i, i);
}

/*
var HashRing = require('hashring');
var ring = new HashRing([
    '127.0.0.1:6001',
    '127.0.0.2:6002',
    '127.0.0.3:6003',
    '127.0.0.3:6004',
    '127.0.0.3:6005',
    '127.0.0.3:6006',
    '127.0.0.3:6007',
], 'md5', {
    'max cache size': 1000
});

console.log(ring);

for(var i=0;i<255;i++) {
    var num = Math.floor(Math.random() * 9);
    var ip = "192.168.1." + num;
    // console.log("===========", ring.get(ip));
    console.log("===========", ring.range(ip,2));
}*/