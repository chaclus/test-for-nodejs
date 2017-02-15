/**
 * Created by chaclus on 2016/9/28.
 */

var amqp = require('amqplib/callback_api');



var receiveMsg = function ( mth_name) {
    amqp.connect('amqp://guest:guest@192.168.3.30:5672', function(err, conn) {
        conn.createChannel(function(err, ch) {
            var q = 'test';

            ch.assertQueue(q, {durable: true});
            ch.prefetch(1);
            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
            ch.consume(q, function(msg) {
                var secs = msg.content.toString().split('.').length - 1;

                console.log( mth_name + " [x] Received :" +msg.content.toString());
                setTimeout(function() {
                    // console.log(" [x] Done");
                    ch.ack(msg);
                }, secs * 1000);
            }, {noAck: false});
        });
    });
};


for(var i=0;i<5;i++) {
    receiveMsg(i);

}