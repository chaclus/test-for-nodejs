/**
 * Created by chaclus on 16/9/3.
 */

var Agenda = require('agenda');
var ObjectId = require('sails-mongo/node_modules/mongodb').ObjectID;

var mongoConnectionString = "mongodb://192.168.3.30/agenda";

var agenda = new Agenda({db: {address: mongoConnectionString}}, function () {
    // query()

    findById();
});


var page = 1;
var size = 10;

var query = function () {
    //{name: 'show'}
    var q = {};
    agenda.jobs(q, function (err, jobs) {
        console.log("jobs : " + jobs);
        if(jobs.length > 0) {
            jobs[0].disable();
            jobs[0].save();
        }
    });

    var o = {};
    if (size) {
        o.limit = size;
    } else {
        o.limit = 10;
    }

    if (page) {
        o.skip = (page) * o.limit;
    } else {
        o.skip = 0;
    }

    agenda._collection.count(q).then(function (result) {
        console.log("jobs count : " + result);
        agenda._collection.find(q, o).toArray(function (err, docs) {
            console.log(docs)
        })
    });
};


var findById = function () {

    var id = "57d0bb394a4953bb4f7f061f";

    var objId = new ObjectId(id);
    console.log('_id : ' + objId.toString());


    agenda._collection.find({_id:objId}).toArray(function (err, docs) {
        console.log(docs);

        agenda._collection.find({_id:docs[0]._id}).toArray(function (error, ret) {
            console.log(ret)
        });
    });
};


