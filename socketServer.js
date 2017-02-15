/**
 * Created by chaclus on 2016/12/21.
 */
var http = require('http');

var redis = require('redis').createClient;
var express = require('express');
var IoRedis = require('ioredis');
var adapter = require('socket.io-redis');

var SERVER_NAME = "socket_io_8199";
var SERVER_INFO = {
    socket_list: []
};


//pub , sub
var pub = redis(6379, "192.168.3.30", { auth_pass: "TUTU@live2016", detect_buffers: true, return_buffers: false });
var sub = redis(6379, "192.168.3.30", { auth_pass: "TUTU@live2016", return_buffers: true});

//http server
var app = express();
var server = http.createServer(app);
server.listen(8199);


//io server
var io = require('socket.io')(server, {log: true, "transports": ["websocket", "polling"]});
io.adapter(adapter({ pubClient: pub, subClient: sub }));

console.log("IO server started at 8199");

var ios = io.of('/ios');
ios.use(function (socket, next) {
    var self = this;
    socket.on('disconnect', function () {
        console.log("======disconnect====" + socket.id);
    });

    return next();
});



ios.on('connection', function (socket) {
    // SERVER_INFO.socket_list.push(socket.id);
    console.log("connected:" + socket.id + ", len:" + Object.keys(ios.sockets).length);

    //单个连接服务端处理
    new SocketMgr(ios, null, socket).listen();
});


var SocketMgr = function (ios, redis, socket) {
    this._ios = ios;
    this._socket = socket;

    this._redis = IoRedis({
        host: '192.168.3.30',
        port: 6379,
        password: 'TUTU@live2016'
    });
};

SocketMgr.prototype.listen = function () {
    var self = this;
    self._socket.on('disconnect', function () {
        var id = self._socket.id;
        console.log("disconnected:" + id);
    });

    self._socket.on('enter', function (data) {
        var liveid = data.liveid;
        self._socket.join(liveid);
        console.log("===socket join room ===" + liveid);

        /*
        setInterval(function () {
            // self._socket.emit("im", {msg: "server_im hello"});
            self._ios.in(liveid).emit('im', {msg: "server_im hello"});
        }, 5000)
        */
    });
};

