/**
 * Created by chaclus on 2017/1/13.
 */

let IoRedis = require('ioredis');
let redis = new IoRedis({
    host: '192.168.3.30',
    port: 6379,
    password: 'TUTU@live2016'
});
var lock = require("redis-lock")(redis, 10);


var exec = function () {
    console.log("Asking for lock");
    lock("myLock", function(done) {
        console.log("Lock acquired");

        setTimeout(function() {     // Simulate some task
            console.log("Releasing lock now");

            done(function() {
                console.log("Lock has been released, and is available for others to use");
            });
        }, 2000);
    });
};

for (let i=0;i<1;i++) {
    exec();
}