/**
 * Created by chaclus on 2017/2/9.
 */


var d = 10, t = 20;

var m = 53232 % (d * t);
console.log('中间变量'+m);

var di = Math.floor(m / 10);
console.log("路由库" + di);


var ti = m % t;
console.log('路由表' + ti);