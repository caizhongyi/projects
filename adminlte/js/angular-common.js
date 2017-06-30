/**
 * 创建与目录的路由
 * @module angular
 * @class uiRouteState
 * @params sref {string} ui-sref 名称 ，
 * 示例： fold-module =>  fold/module ;
 * 其不同之处在于 加只是目映射。不存在母版与内容块之间的关系。
 * 示例： module.submodule =>  module/submodule
 * 子母版与内容块之间的关系，也就是嵌套路由的关系。
 * @params options.files {array} 后加载的文件名称
 * */

// jquery ajax 实现跨域
$.ajaxSetup({
    xhrFields: {
        withCredentials: true
    },
    crossDomain: true
});

/**
 * 公用提示信息
 * @param msg {string|object} 字符或提示对象信息
 * */
angular.message = function (msg) {
    if (typeof msg == 'string') {
        alert(msg);
        return;
    }
    var html = '';
    for (var i in msg) {
        html += i + ':' + msg[i].join(',') + '\n';
    }
    ;
    alert(html);
}

// Your app's root module...
angular.module('http.post', [], ["$httpProvider", function ($httpProvider) {
    // Use x-www-form-urlencoded Content-Type
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

    /**
     * The workhorse; converts an object to x-www-form-urlencoded serialization.
     * @param {Object} obj
     * @return {String}
     */
    var param = function (obj) {
        var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

        for (name in obj) {
            value = obj[name];

            if (value instanceof Array) {
                for (i = 0; i < value.length; ++i) {
                    subValue = value[i];
                    fullSubName = name + '[' + i + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            }
            else if (value instanceof Object) {
                for (subName in value) {
                    subValue = value[subName];
                    fullSubName = name + '[' + subName + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            }
            else if (value !== undefined && value !== null)
                query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
        }

        return query.length ? query.substr(0, query.length - 1) : query;
    };

    // Override $http service's default transformRequest
    $httpProvider.defaults.transformRequest = [function (data) {
        return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    }];
}])