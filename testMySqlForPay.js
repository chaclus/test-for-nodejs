/**
 * Created by chaclus on 2017/2/10.
 */

var request = require('request');
var mysql      = require('mysql');

var connection = mysql.createConnection({
    host     : '192.168.3.30',
    user     : 'root',
    password : 'dev_sql.2016',
    database : 'artisan_pay_online'
});


var queryAllUser = function () {
    connection.connect();

    connection.query('SELECT * from t_user', function (error, results, fields) {
        if (error) {
            console.error(error);
        }else{
            results.forEach(function (user) {
                //id, coins, diamonds
                console.log("id:" + user.id+","+user.coins +","+user.diamonds);
                // testDelUserById(user.id);
                // testCreateUser(user.id);

            });
        }

    });

    connection.end();
};


var testCreateUser = function (id, coins, diamonds) {
    var livData = {
        url: 'http://127.0.0.1:3002/rest/v1/user/save',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        json: {
            id: id,
            coins: coins,
            diamonds: diamonds
        }
    };

    request(livData, function (error, res, body) {
        if(error) {
            console.log(error);
        }else{
            console.log("create user: ", body);
        }
    });
};


var testGetUserById = function (loginId) {
    var livData = {
        url: 'http://127.0.0.1:3002/rest/v1/user/getById?id='+loginId,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        json: {
            name: loginId,
        }
    };

    request(livData, function (error, res, body) {
        if(error) {
            console.log(error);
        }else{
            console.log("create user: ", body);
        }
    });
};


var testDelUserById = function (loginId) {
    var livData = {
        url: 'http://127.0.0.1:3002/rest/v1/user/deleteById?id='+loginId,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        json: {
            name: loginId,
        }
    };

    request(livData, function (error, res, body) {
        if(error) {
            console.log(error);
        }else{
            console.log("create user: ", body);
        }
    });
};

var testGetAll = function (loginId) {
    var livData = {
        url: 'http://127.0.0.1:5000/rest/user/getAll',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    request(livData, function (error, res, body) {
        if(error) {
            console.log(error);
        }else{
            console.log("all user: ", body);
        }
    });
};


var testUpdateUserById = function (loginId) {
    var livData = {
        url: 'http://127.0.0.1:5000/rest/user/update',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        json: {
            id: loginId,
            name: "123456",
        }
    };

    request(livData, function (error, res, body) {
        if(error) {
            console.log(error);
        }else{
            console.log("create user: ", body);
        }
    });
};

//000188d722d115d97141c8fe
// testGetUserById('000188d722d115d97141c8fe');
// testDelUserById('00018a005d4532722c9b6991');
//     testUpdateUserById('000192795d4532722c9b72f2');
// testGetAll();

// queryAllUser();

// testCreateUser('000187c32b0fa98f0be38c1a', 0, 27);
// testGetUserById('000187c32b0fa98f0be38c1a');
testDelUserById('000187c32b0fa98f0be38c1a');