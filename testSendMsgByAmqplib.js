/**
 * Created by chaclus on 2016/9/28.
 */

var amqp = require('amqplib/callback_api');


amqp.connect('amqp://guest:guest@192.168.3.30:5672', function (err, cnn) {
    cnn.createChannel(function(err, ch) {

        var queueName = 'test';
        ch.assertQueue(queueName, {durable: true});
        for (var i = 0; i < 10; i++) {
            var msg = 'Hello World : ' + i;
            ch.sendToQueue(queueName, new Buffer(msg), {persistent: true});
            console.log("send msg : " + msg);
        }
    });
});