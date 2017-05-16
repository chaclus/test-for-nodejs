/**
 * Created by chaclus on 2017/2/22.
 */
var NodeRSA = require('node-rsa');

var key = new NodeRSA({b: 512});

var text = 'Hello RSA!';
var encrypted = key.encrypt(text, 'hex');
console.log('encrypted: ', encrypted);
var decrypted = key.decrypt(encrypted, 'utf8');
console.log('decrypted: ', decrypted);