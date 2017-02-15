/**
 * Created by chaclus on 2016/12/10.
 */
var events = require('events');

var eventEmitter = new events.EventEmitter();
var connectHandler = function connected() {
    console.log("connection successful.");
    eventEmitter.emit('data_received');
};

eventEmitter.on('data_received', function () {
    console.log("data reeived successfully");
});
eventEmitter.on('connection', connectHandler);

eventEmitter.emit("connection");


