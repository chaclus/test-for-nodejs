/**
 * Created by Andrewbo on 15/8/16.
 */

var config = require('../config');
var qiniu = require('qiniu');

qiniu.conf.ACCESS_KEY = config.qn.accessKey;
qiniu.conf.SECRET_KEY = config.qn.secretKey;

exports.uptoken = function(req, res, next) {

    var putPolicy = new qiniu.rs.PutPolicy('pic-daimao');
    putPolicy.callbackUrl = config.qn.callback_url;
    putPolicy.callbackBody = 'avatar=$(key)&hash=$(etag)&loginid=$(x:loginid)';

    var token = {
        'uptoken': putPolicy.token()
    };
    res.send({
        returncode : 200,
        data : token
    });
};

exports.uptoken_avatar = function(req, res, next) {

    var putPolicy = new qiniu.rs.PutPolicy('pic-daimao');
    putPolicy.callbackUrl = config.qn.callback_url_avatar;
    putPolicy.callbackBody = 'avatar=$(key)&hash=$(etag)&loginid=$(x:loginid)';

    var token = {
        'uptoken': putPolicy.token()
    };
    res.send({
        returncode : 200,
        data : token
    });
};

exports.uptoken_snapshot = function(req, res, next) {
    var putPolicy = new qiniu.rs.PutPolicy('pic-daimao');
    putPolicy.callbackUrl = config.qn.callback_url_snapshot;
    putPolicy.callbackBody = 'snapshot=$(key)&hash=$(etag)';

    var token = {
        'uptoken': putPolicy.token()
    };
    res.send({
        returncode : 200,
        data : token
    });
}

exports.upload_cb = function(req, res, next) {

    var loginid = req.body.loginid;
    var avatar = req.body.avatar;

    if ((loginid != null) && (avatar != null)) {

        avatar = config.qn.img_url_ + avatar;
        UserProxy.updateUserAvatar(loginid, avatar, function (err, user) {
            if (err || !user) {
                return res.send({
                    returncode: 303,
                    data: {}
                });
            }
            return res.send({
                returncode: 200,
                data: user
            });
        });
    } else {
        return res.send({
            returncode: 303,
            data: {}
        });
    }
};

exports.upload_cb_avatar = function(req, res, next) {

    var loginid = req.body.loginid;
    var avatar = req.body.avatar;

    if ((loginid != null) && (avatar != null)) {

        avatar = config.qn.img_url_ + avatar;
        UserProxy.updateUserAvatar(loginid, avatar, function (err, user) {
            if (err || !user) {
                return res.send({
                    returncode: 303,
                    data: {}
                });
            }
            return res.send({
                returncode: 200,
                data: user
            });
        });
    } else {
        return res.send({
            returncode: 301,
            data: {}
        });
    }
};

exports.upload_cb_snapshot = function(req, res, next) {
    var snapshot = req.body.snapshot;

    if (snapshot != null) {
        snapshot = config.qn.img_url_ + snapshot;
        return res.send({
            returncode: 200,
            data: {
                'snapshot' : snapshot
            }
        });
    } else {
        return res.send({
            returncode: 301,
            data: {}
        });
    }
}