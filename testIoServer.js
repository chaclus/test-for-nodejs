/**
 * Created by chaclus on 16/9/5.
 */
var io = require('socket.io')();

var ios = io.of('ios/server');

ios.on('connection', function (client) {
    console.log('client connected server.' + client.id);
    client.join('10001');
    // client.emit('receive', 'hello socket');

    client.on('broadcast', function (data) {
        console.log('broadcast msg : ' + data);
        client.in('10001').emit('receive', data);
    });

    client.on('disconnect', function () {
        console.log('client disconnect.');
    });

    client.on('joinRobot', function () {
        ios.emit('msg', "aaaaaa");
    });
});

io.listen(8899);
console.log('server is start on 8899');