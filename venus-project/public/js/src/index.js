// 通过 require 引入依赖
var $ = require('jquery');
var easing = require('jquery-easing');
// 通过 exports 对外提供接口
console.log($);

exports.doSomething = {};

// 或者通过 module.exports 提供整个接口
// module.exports =  ...