/**
 * Created by chaclus on 2016/11/5.
 */

var mongoose = require('mongoose');
var mysql = require('mysql');
var Schema    = mongoose.Schema;

mongoose.connect('mongodb://192.168.3.30/deelive', {keepAlive: 10}, function (err) {
    if (err) {
        console.error('connect to %s error: ', 'mongodb://192.168.3.30/deelive', err.message);
        process.exit(1);
    }
    console.log("db success")
});
var users = mongoose.model('deeusers',
    {
        loginid: Schema.Types.ObjectId,
        num_revenue: Number,
        num_consume: Number
    });


var findUserByLoginId = function (loginid, cb) {
    // users.find({loginid: new Schema.Types.ObjectId(loginid)}, function (err, data) {
    users.findOne({loginid: loginid}, function (err, data) {
        if(err) {
            console.error(err);
            cb(err, null)
        }else{
            cb(null, data);
        }
    });
};


var connMysql = function () {
    var connection = mysql.createConnection({
        host     : '192.168.3.30',
        user     : 'root',
        password : 'dev_sql.2016',
        database : 'artisan_pay_online'
    });

    connection.connect();
    connection.query('SELECT * from t_user', function(err, rows, fields) {
        if (err) throw err;

        if(rows && rows.length >0) {
            rows.forEach(function (row) {

                findUserByLoginId(row.id, function (err, user) {
                    if(user) {
                        console.log(user.loginid+" /// "+user.num_revenue + " /// " + user.num_consume);

                        var sql = "UPDATE t_user set num_revenue=" + user.num_revenue +", num_consume="+user.num_consume +"  where id= '"+user.loginid.toString()+"'";
                        connection.query(sql, function (err, result) {
                            if(err) {
                                console.error("update err,", err);
                            }else{
                                console.log("change rows  : ", result.changedRows);
                            }
                        })
                    }
                });
            });
        }

    });
};
connMysql();