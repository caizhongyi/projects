// Make sure to include the `ui.router` module as a dependency
// api http://docs.angularjs.cn/api

var version = '?r=' + parseInt(Math.random() * 10000) + new Date().getTime() , debug = true;

if( !debug ) version = "?20150723"

require('../../../../sea_modules/jquery/1.9.1/jquery.min.js');
require('../../../../sea_modules/bootstrap/js/bootstrap.min.js');
require('../../../../sea_modules/es5/dist/index.js');
require('../../../../sea_modules/angular-ui-router/lib/angular-1.3.0/angular.js');
require('../../../../sea_modules/angular-ui-router/release/angular-ui-router.min.js');
require('../../../../sea_modules/oclazyload/dist/ocLazyLoad.min.js');
require('../../../../sea_modules/iCheck/flat/blue.css');
require('../../../../sea_modules/jquery-autocomplete/jquery.autocomplete.css');
require('../../../../sea_modules/jquery-autocomplete/jquery.autocomplete.js');
require('../../../../sea_modules/angular-bootstrap/dist/ui-bootstrap-tpls.min.js');

require('../../../../sea_modules/angular-loading-bar/build/loading-bar.min.css');
require('../../../../sea_modules/angular-loading-bar/build/loading-bar.min.js');
require('../../../../sea_modules/angular-file-upload/dist/ng-file-upload-all.min.js');

require('../../../../js/app.min.js');
require('../../directive.js');
require('../../filter.js');
require('../../datepicker.js');

//动态html 使用 $compile(tpl)($scope); 编译

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
utils.message = function (msg) {
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

// router Provider
angular.module('app.router', ['ui.router','oc.lazyLoad']).provider('route', [ '$stateProvider', function ( $stateProvider ) {
    var self  = this;

    this.manager = {
        "datepicker" : {
            common : [],
            items : [
                {
                    sref : 'datepicker-',
                    options : {}
                }
            ]
        }
    };

    this.state = function ( sref, options ) {
        var random = version;
        var defaults = {
            page: {
                title: '',
                desc: '',
                key: '',
                content: ''
            },
            query: '',
            url: null,
            controller: 'controller.' + sref.replace(/-/g, '.'),
            files: ['index'],
            utilsFiles : [ ],
            resolve: {},
            templateUrl: null
        }

        options = angular.extend({}, defaults, options);

        options.url = options.url || '/' + sref.replace(/-/g, '/');

        function path(sref) {
            return sref.replace(/\./g, '/').replace(/-/g, '/');
        }

        options.resolve.lazyload = function ($ocLazyLoad) {
            var files = [];

            function getFileUrl ( file ){
                var url = '';
                if (file.indexOf('.js') == -1) {
                    file = file + '.js';
                    url = "app/" + path(sref) + '/' + file + random;
                }
                else {
                    url = file + random;
                }
                return url ;
            }

            angular.forEach( options.utilsFiles , function (n, i) {
                var url = '', file = n, modelName =  path(sref).split('/')[0];
                if (file.indexOf('.js') == -1) {
                    file = file + '.js';
                    url = "app/" + modelName + '/utils/' + file + random;
                }
                else {
                    url = file + random;
                }
                this.push( url );
            }, files );

            angular.forEach( options.files , function (n, i) {
                this.push( getFileUrl (n) );
            }, files );

            return $ocLazyLoad.load({
                cache: !angular.debug,
                // serie: true,
                name: sref,  //module
                files: files
            })
        }

        options.templateUrl = options.templateUrl || 'app/' + path(sref) + '/index.html' + random;
        options.url += options.query;
        $stateProvider.state( sref, options );
    }
    this.stateSub = function ( sref, options ) {
        var s = sref.split('.'), root = 'app/' + s[0].replace(/-/g, '/') + '/';
        var defaults = {
            url: '/' + s[1],
            templateUrl: root + s[1] + '.html' + version,
            controller: 'controller.' + s[0].replace(/-/g, '.'),
            files: [root + 'service.js' + version, root + 'index.js' + version]
        }
        self.state( sref, angular.extend({}, defaults, options));
    }

    this.init = function(){
        angular.forEach( self.manager , function( n , i ){
            n.items.forEach(function( m , j ){
                m.options.utilsFiles = n.common;
                self.state( m.sref , m.options );
            })
        })
    }

    this.$get =  function( $stateProvider ) { // injectables go here
        var service = {

        };
        return service;
    }
}]);

var app = angular.module('app', [
    'utils.directive',
    'utils.filter',
    'utils.datepicker',
    'ui.router',
    'oc.lazyLoad',
    'app.router',
    'ui.bootstrap',
    'angular-loading-bar',
    'http.post'
]);

// 全局变量
app.constant('MBS_DOMAIN', 'http://mbs.273.cn');
app.constant('PAGINATION', {
    maxSize: 10,
    currentPage: 1,
    pageSize: 10
});


app.config(["$stateProvider", "$urlRouterProvider", "$httpProvider", "$ocLazyLoadProvider", "$locationProvider", "routeProvider",
    function ($stateProvider, $urlRouterProvider, $httpProvider, $ocLazyLoadProvider, $locationProvider , routeProvider) {
        $ocLazyLoadProvider.config({
            //loadedModules: ['monitorApp']//主模块名,和ng.bootstrap(document, ['monitorApp'])相同
            //jsLoader: requirejs //使用requirejs去加载文件
            // files: ['modules/summary','modules/appEngine','modules/alarm','modules/database'],
            // 主模块需要的资源，这里主要子模块的声明文件
            debug: false
        });

        $httpProvider.defaults.withCredentials = true;
        // 错误的路由重定向
        $urlRouterProvider.otherwise('/mbs/index/home');

        routeProvider.manager = {
            "mbs" : {
                items : [
                    {
                        sref : 'mbs-index-home',
                        options : { page: {title: '首页'}}
                    }
                ]
            }
        };
        routeProvider.init();


        // for seo
        // $locationProvider.html5Mode(true);
        // $locationProvider.hashPrefix('!');
        // window.prerenderReady = false
    }])

    .controller('controller.init', ["$scope", "$stateParams",
        function ($scope, $stateParams) {

        }])
    .run(["$rootScope", "$state", "$stateParams", "$window", "$location", "$log", "$http", "cfpLoadingBar", "datepickerTemplateCache",
        function ($rootScope, $state, $stateParams, $window, $location, $log, $http, cfpLoadingBar, datepickerTemplateCache) {
            // It's very handy to add references to $state and $stateParams to the $rootScope
            // so that you can access them from any scope within your applications.For example,
            // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
            // to active whenever 'contacts.list' or one of its decendents is active.
            $state.in = function (node) {
                node = node.replace(/-/g,'/');
                return $state.$current.url.prefix.indexOf(node) != -1;
            }

            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;

            var locationChangeStartOff = $rootScope.$on('$locationChangeStart', locationChangeStart);
            var locationChangeSuccessOff = $rootScope.$on('$locationChangeSuccess', locationChangeSuccess);

            var routeChangeStartOff = $rootScope.$on('$routeChangeStart', routeChangeStart);
            var routeChangeSuccessOff = $rootScope.$on('$routeChangeSuccess', routeChangeSuccess);

            var timer;

            function locationChangeStart(event, newUrl) {
                // locationChangeStartOff(); //Stop listening for location changes or you can do others
                // mePageLoading.show('Parallelogram');
                // event.preventDefault();
                //   cfpLoadingBar.start();
                $('#page-loading').addClass('in')
                return;
            }
            function locationChangeSuccess(event) {
                // timer && clearTimeout(timer);
                // timer = setTimeout(function(){ mePageLoading.hide()},2000)
                // event.preventDefault();
                //  cfpLoadingBar.complete();
                $('#page-loading').removeClass('in')
                return;
            }

            function routeChangeStart(event) {
                //   $log.log('routeChangeStart');
            }

            function routeChangeSuccess(event) {
                //   $log.log('routeChangeSuccess');
            }

            $('#page-loading').removeClass('in');

            // 时间控件模版初始化
            datepickerTemplateCache.reset();


        }])


