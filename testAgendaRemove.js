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
var agenda = new Agenda({db: {address: mongoConnectionString}},function () {

    query();
});

var page = 1;
var size = 10;

var query = function () {
    //{name: 'show'}
    var q = {};
    agenda.jobs(q, function (err, jobs) {
        console.log("jobs : " + jobs);
        jobs.forEach(function (job) {
            agenda.cancel({name : job.attrs.name}, function(err, numRemoved) {
                if(err) {
                    console.log(err);
                }else{
                    console.log("remove : " + numRemoved);
                }
            });
        });
    });
};
