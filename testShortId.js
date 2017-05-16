/**
 * Created by chaclus on 2017/1/13.
 */
/*

var ReadWriteLock = require('ReadWriteLock');
var rwlock = new ReadWriteLock();


var lock = function () {
    rwlock.writeLock(function(cb){
        console.log('Start write 1!', new Date());
        setTimeout(function(){
            console.log('The writing procedure 1 is finished!');
            cb();
        },100);
    });

    rwlock.readLock(function(cb){
        console.log('Start read 3!', new Date());
        setTimeout(function(){
            console.log('The reading procedure 3 is finished!');
            cb();
        },100);
    });
};

for(var i=0;i<10;i++) {
    lock()
}
    */




var IoRedis = require('ioredis');
var redis = new IoRedis({
    host: '192.168.3.30',
    port: 6379,
    password: 'TUTU@live2016'
});
var lock = require('redislock').createLock(redis, {
    timeout: 10000,
    retries: 10,
    delay: 50
});


var shortid = function (callback) {
    var self = this;
    self.cb = callback;

    var createShortId = function () {
        var num = new Array(8);
        var c;
        for(var i=0; i<8;i++) {
            num[i] = Math.floor(Math.random() * 9 + (i==0 ? 1: 0) );
            c = num[i];
            for(var j =0; j < i; j++) {
                if(num[j] == c) {
                    i--;
                    break
                }
            }
        }
        return num.toString().replace(/,/g, '');
    };

    var setbit = function (id, callback) {
        redis.setbit('deelive:shortid', id, 1, callback);
    };

    var getbit = function (id, callback) {
        redis.getbit('deelive:shortid', id, callback);
    };

    lock.acquire('app:shortid:lock', function(err) {
        // if (err) ... Failed to acquire the lock
        if(err) {
            return self.cb(err, null);
        }

        // var id = createShortId();
        var id = '16238754';
        console.log(id);
        getbit(id, function (err, ret) {
            if (err) {
                self.cb(err, null);
            } else {
                if (ret == 0) {
                    setbit(id, function (err, ret) {
                        if (err) {
                            self.cb(err, null);
                        } else {

                            setTimeout(function () {
                                lock.release(function (err) {
                                    if (err) {
                                        self.cb(err, null);
                                    } else {
                                        self.cb(null, id);
                                    }
                                });
                            }, 2000);


                        }
                    });
                }else{
                    callback(null, null);
                }
            }
        });

    });
};
/*
shortid(function (err, id) {
    if(err) {
        console.error("shortid >>> ", err);
    }else{
        console.log("id::::", id);
    }
});
*/



var EventProxy = require('eventproxy');
var RedisLock = function (reids, options) {
    this._redis = reids;
    this._num = 0;
    this._ep = new EventProxy();

    // Iterate over supplied options
    if (options && typeof options === 'object') {
        for (var key in RedisLock._defaults) {
            if (key in options) this[key] = options[key];
        }
    }
};
RedisLock._defaults = {
    timeout: 10, //单位秒
    delay: 50,  //演示时间 单位毫秒
    retries: 10, // 重试次数
};

var acquireForWait = function (self, key) {

    var wait = function (self, key, callback) {
        self._redis.setnx(key, 'lock', function (err, ret) {
            if(err) {
                callback(err);
            }else{
                if(ret && ret == 1) {
                    callback(null)
                }else{
                    setTimeout(function () {
                        // console.log('============')
                        wait(self, key, callback);
                    }, self.delay);
                }
            }
        });
    };
    return new Promise(function (resolve, reject) {
        wait(self, key, function (err) {
            if(err) {
                reject(err)
            }else{
                resolve(null);
            }
        });
    });

};
RedisLock.prototype.acquire = function (key, callback) {
    var self = this;
    self._key = key;
    var num = 0;

    acquireForWait(self, key).then(function () {
        self._redis.expire(key, self.timeout);
        callback(null);
    }, function (err) {
        callback(err);
    });
};

RedisLock.prototype.release = function (callback) {
    var self = this;

    self._locked = false;
    self._redis.expire(self._key, 0);
    callback();
};

var num = 0;


var rLock = new RedisLock(redis,{
    timeout: 10, //单位秒
    delay: 50,  //演示时间 单位毫秒
    // retries: 200, // 重试次数
});
var test = function (i) {
    rLock.acquire("rlock_test_test1", function (err) {
        if(err) {
            console.error("rlock err ", err);
        }else {
            num = 1;
            console.log("rlock >>> get the lock " + num);
            rLock.release(function () {
                num  = 0;
                console.log("rlock >>> release the lock");
            });


        }
    });
};

for(var i=0; i<1000;i++) {
    test(i);
}


