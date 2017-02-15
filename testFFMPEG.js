/**
 * Created by chaclus on 2016/12/29.
 */



var exec = require('child_process').exec;

var cmd = 'ffmpeg -re -i /Users/chaclus/Movies/Dark Matter S01/1.mkv -s 480x800 -vcodec libx264 -acodec aac -strict -2 -f flv "rtmp://pili-publish.live.aisoqu.com/aisoqu/0000165b0e6385c3e4803d4c?e=1483256370&token=5-P6jtIbZA56Pnaxq-QGH6lTjVMUKAy8NTrAKZGJ:aOiqjxwims7n2mqo7XlEHBi80s4="';


var child = exec(cmd, function(error, stdout, stderr) {
    console.log("error  ==> ", error);
    console.log("stdout ==> ", stdout);
    console.log("stderr ==> ", stderr)
});

// console.log("child====>", child);
setTimeout(function () {

    var cmd = "ps -ef|grep ffmpeg | grep -v grep | awk '{print $2}' ";

    var child = exec(cmd, function (err, stdout, stderr) {
        if(err) {
            console.error("err == > ", err);
        }else{
            var pid = stdout;
            if(stdout) {
                pid = parseInt(stdout);
                console.log("pid : " + pid);

                var kill_cmd = "kill -9 " + pid;
                console.log(" kill cmd : " + kill_cmd);
                var _child = exec(kill_cmd, function (err, stdout, stderr) {
                    if(err) {
                        console.error("err ===<> ", err);
                    }else{
                        console.log("stdout ===<> ", stdout);
                        console.log("stderr ===<> ", stderr);
                    }
                });
            }
        }
    });
}, 10 * 1000);

