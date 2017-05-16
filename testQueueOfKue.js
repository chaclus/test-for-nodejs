/**
 * 测试 任务队列框架 kue
 * Created by chaclus on 2017/2/15.
 */

var kue = require('kue');

var queue = kue.createQueue({
    prefix: 'kue_q',
    redis: {
        port: 6379,
        host: '192.168.3.30',
        auth: 'TUTU@live2016',
        db: 0,
    }
});

queue.on( 'error', function( err ) {
    console.log( 'Oops... ', err );
});


var addJob = function () {
    var job = queue.create('email', {
        title: 'welcome email for tj'
        , to: 'tj@learnboost.com'
        , template: 'welcome-email'
    }).save(function (err) {
        if (!err) console.log("add and get the job id: ",job.id);
    });


    job.on('complete', function (result) {
        console.log('Job completed with data ', result);

    }).on('failed attempt', function (errorMessage, doneAttempts) {
        console.log('Job failed');

    }).on('failed', function (errorMessage) {
        console.log('Job failed');

    }).on('progress', function (progress, data) {
        console.log('progress #### ' + job.id + ' ' + progress + '% complete with data ', data);

    });
};



var processJob = function () {
    queue.process('email', function(job, done){
        console.log("job: ", job.data);
        done();
    });
};

addJob();
processJob();