/**
 * Created by chaclus on 16/9/3.
 */

var Agenda = require('agenda');


var mongoConnectionString = "mongodb://192.168.3.30/agenda";
/*
var agenda = new Agenda({db: {address: mongoConnectionString}}, function () {
    query()
});
*/
var agenda = new Agenda({db: {address: mongoConnectionString}});

var page = 1;
var size = 10;



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


var hello = function (cb) {
    console.log("==========Job is running=========")
    cb();
};

var query = function () {
    //{name: 'show'}
    var q = {name:'new_21'};
    agenda.jobs(q, function (err, jobs) {
        console.log(jobs);
        if(jobs.length > 0) {
            jobs[0].enable()
            jobs[0].save();
        }
    });

};

setTimeout(query, 3000);
