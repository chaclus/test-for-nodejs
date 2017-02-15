/**
 * Created by chaclus on 16/9/3.
 */

var Agenda = require('agenda');


var mongoConnectionString = "mongodb://192.168.3.30/agenda";
var agenda = new Agenda({db: {address: mongoConnectionString}});

var hello = function (cb) {
    console.log("==========Job is running=========")
    cb();
};

var jobDefine = function (jobName, cb) {
    agenda.define(jobName, function (job, done) {
        if (job) {
            console.log("hello job =======" + job.attrs.name);
        }
        cb(done);
    });
};

var jobStart = function (cron, jobDefineName) {
    agenda.on('ready', function () {
        agenda.every("*/2 * * * *",jobDefineName);
        agenda.start();
    });
};

for(var i=0; i<23; i++) {
    var jName = "new_" + i;
    jobDefine(jName, hello);
    jobStart(null, jName);
}



agenda.on("start", function (job) {
    console.log('Job %s run .', job.attrs.name);
});

agenda.on("complete", function (job) {
    console.log('Job  %s finished ', job.attrs.name);
});


agenda.on('success', function(job) {
    console.log("Successfully to: %s", job.attrs.name);
});


agenda.on('fail', function(err, job) {
    console.log("Job failed with error: %s", err.message);
});
