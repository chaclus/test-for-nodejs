/**
 * Created by chaclus on 16/9/5.
 */

var io = require('socket.io-client');


var client = function() {
    var socket = io.connect("http://127.0.0.1:8899/ios/server");
    socket.on('connect', function(){
        console.log("connect")


        socket.on('receive', function(data){
            console.log('data : ' + data);
        });
        socket.on('disconnect', function(){
            console.log('disconnect');
        });


        socket.on('msg', function (data) {
            console.log(' receive data : ' + data);
        });
    });

};

for(var i=0;i<10;i++) {
    client();
}