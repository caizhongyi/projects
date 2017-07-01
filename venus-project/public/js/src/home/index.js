define(function(require, exports, module) {

    // 通过 require 引入依赖
    require('./index.css');
    var $ = require('jquery');
    // 通过 exports 对外提供接口
    exports.doSomething = 'ss';

    // 或者通过 module.exports 提供整个接口
    // module.exports = ...

});