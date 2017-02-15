/**
 * Created by chaclus on 2016/12/21.
 */


var io = require('socket.io-client');


var connect = function () {
    var socket = io.connect('http://127.0.0.1:8199/ios', {'forceNew': true, 'transports': ['websocket']});
    socket.on('connect', function () {
        console.log("socket connected");
        socket.emit('enter', {liveid: 'aaaaaaaa'});

        socket.on("im", function (data) {
            console.log("im data >>>>> ", data);
        });
    });
};

for (var i=0;i<2;i++) {
    connect();
}