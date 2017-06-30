// Make sure to include the `ui.router` module as a dependency
// doc http://docs.angularjs.cn/api
//require('css/style.css');
//ng 动画
//http://www.tuicool.com/articles/jEvY3a
//http://www.oschina.net/translate/javascript-animations-angularjs-applications?cmp
//http://www.it165.net/pro/html/201405/13930.html

require('jquery');
require('es5');
require('bs');
require('js/app.min.js');
require('angular');
require('angular-animate');
require('angular-ui-router');
require('oclazyload');
require('angular-messages');
require('angular-cookies');
require('jquery-md5');
require('jquery-ui');

require('app/utils/service.js?v1');

require('sea_modules/angular-bootstrap/dist/ui-bootstrap-tpls.min.js');

require('sea_modules/angular-loading-bar/build/loading-bar.min.css');
require('sea_modules/angular-loading-bar/build/loading-bar.min.js');

require('sea_modules/datatables/jquery.dataTables.js');
require('sea_modules/datatables/dataTables.bootstrap.css');
require('sea_modules/datatables/dataTables.bootstrap.js');

angular.debug = true;

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
angular.uiRouteState = function ( sref ,options ){
    var random = angular.debug ? '?r=' + parseInt( Math.random() * 10000 ) + new Date().getTime() : '';

    var defaults = {
        page  : {
            title    : '',
            desc     : '',
            key      : '',
            content  : ''
        },
        query : '',
        url :  '/',
        controller : 'controller.' + sref.replace(/-/g, '.'),
        files : ['index'],
        resolve : {
        }
    }

    options = angular.extend( {} ,defaults , options );

    options.url = '/' + sref.replace(/-/g,'/');

    function path( sref ){
        return sref.replace(/\./g,'/').replace(/-/g,'/');
    }

    options.resolve.lazyload  = function( $ocLazyLoad ){

        var files = [];
        angular.forEach( options.files , function( n  , i ){
            var file = n.indexOf('.js') != -1 ? n : n + '.js' ;
            this.push( "app/" + path(sref) + '/' + file + random ) ;
        } , files );
        return $ocLazyLoad.load({
            cache: !angular.debug,
            name: "app." + sref ,  //module
            //serie: true,
            files: files
        })
    }

    options.templateUrl = 'app/' + path(sref) + '/index.html' +  random ;
    options.url += options.query  ;

    this.state( sref , options );
};

var app = angular.module('app', [
    'app.utils.service',
    'ui.router',
    'oc.lazyLoad',
    'ngAnimate',
    'ngMessages',
    'ngCookies',
    'ui.bootstrap',
    'angular-loading-bar',
    'app.http.post'
]);

app.config([ '$stateProvider', '$urlRouterProvider','$httpProvider','$ocLazyLoadProvider',
    function ($stateProvider,   $urlRouterProvider , $httpProvider, $ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            //loadedModules: ['monitorApp']//主模块名,和ng.bootstrap(document, ['monitorApp'])相同
            //jsLoader: requirejs //使用requirejs去加载文件
            // files: ['modules/summary','modules/appEngine','modules/alarm','modules/database'],
            // 主模块需要的资源，这里主要子模块的声明文件
            debug: false
        });
        // 错误的路由重定向
        $urlRouterProvider.otherwise('/wandao');

        angular.uiRouteState.call( $stateProvider,  'wandao',{
            page : { title : '玩道' }
        });
        angular.uiRouteState.call( $stateProvider,  'keshefoundation',{
            page : { title : '凯史中国' }
        });
    }
]);

app.controller('controller.init', [ '$scope' , '$stateParams' , '$cookieStore' , 'utils',function( $scope , $stateParams ,$cookieStore , utils  ){

    $('.wrapper').stop(true, true).fadeIn();
    $('.login-box').hide();
    return ;

    $scope.signout = function(){
        $('.login-box').stop(true,true).fadeIn();
        $('.wrapper').hide();
        $cookieStore.remove('user');
        //$cookieStore.put("name","my name");
        //$cookieStore.remove("name");
        //$cookieStore.get("name") == "my name";
    };

    function setMenus(){
        var $sideMenus = $('.sidebar-menu');
        utils.getCurrentCodes( $cookieStore.get('user') ).success(function( res ){
            var codes = res.data ;
            angular.forEach( codes ,function( n, i ){
                var sref =  n.replace(/\./g,'-').replace(/\|/g,'-');
                var $elem = $sideMenus.find('[ui-sref^='+ sref +']').closest('li');
                if( $elem.length && $elem.is(':hidden')){
                    var $node =  $elem.closest('.treeview');
                    if($node.is(':hidden')) $node.stop(true,true).fadeIn();
                    $elem.stop(true,true).show();
                }
            });
        })
    }

    if(!$cookieStore.get("user")){
        $('.login-box').stop(true,true).fadeIn();
        $('.wrapper').hide();
    }
    else{
        setMenus();
        $scope.profile = $cookieStore.get("user");
    }

    $scope.submitted = false;
    $scope.interacted = function( field ){
        return  field.$dirty || $scope.submitted || field.isblur;
    }

    $scope.submitForm = function(isValid) {
        $scope.submitted = true;
        if (!isValid) {
            $('#tips-info').html('<i class="fa fa-info-circle"></i> 验证失败!');
        }
        else{
            utils.getToken().success(function(data) {
                $scope.user.token = data.data.access_token;
                $scope.user.password = $.md5($scope.user.password);
                if(data.code == 0) {
                    localStorage.setItem("token",data.data.access_token);
                    utils.login( $scope.user ).success(function( res ){
                        if( res.code == 0 ){
                            var  user  =  res.data ;
                            user.token = $scope.user.token;
                            $cookieStore.put('user', user );
                            $scope.profile = user ;
                            setMenus();
                            $('.wrapper').stop(true, true).fadeIn();
                            $('.login-box').hide();
                        }
                        else{
                            $('#tips-info').html('<i class="fa fa-info-circle"></i> '+ res.msg);
                        }
                    });
                } else {
                    $('#tips-info').html('<i class="fa fa-info-circle"></i> '+ data.msg);
                }
            })
        }
    };
}])
    .directive('hintOnBlur', [function() {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, ngModel) {
                element.bind('focus', function() {
                    $('#tips-info').html('');
                    scope.$apply(function() {
                        ngModel.isblur = false;
                       // ngModel.$setValidity('recordLoading', !bool);
                    });
                }).bind('blur', function() {
                    scope.$apply(function() {
                        ngModel.isblur = true;
                      //  ngModel.$setValidity('recordLoading', !bool);
                    });
                });
            }
        }
    }])
    .directive('onFinishRenderFilters', function ($timeout) {
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
                if (scope.$last === true) {
                    $timeout(function() {
                        scope.$emit('ngRepeatFinished');
                    });
                }
            }
        };
    })
    .directive('loading' , function(){
        return {
            restrict : 'AE',
            replace: true,
            scope : {
             //   status: '='
            },
            template : '<div class="loading"></div>',
            link : function(  scope , element ,attrs ){
                scope.$watch(attrs.shown, function ( val ) {
                    if ( val ) {
                        element.addClass('in');
                    } else {
                        element.removeClass('in');
                    }
                });
            }
        }
    })

app.run([ '$rootScope', '$state', '$stateParams',  '$window', '$location', '$log', '$http','cfpLoadingBar',
    function ($rootScope,   $state,   $stateParams ,$window, $location, $log, $http ,cfpLoadingBar) {
        // It's very handy to add references to $state and $stateParams to the $rootScope
        // so that you can access them from any scope within your applications.For example,
        // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
        // to active whenever 'contacts.list' or one of its decendents is active.
        $state.in = function( node ){
            return  $state.$current.url.prefix.indexOf( node ) != -1;
        }
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        var locationChangeStartOff = $rootScope.$on('$locationChangeStart', locationChangeStart);
        var locationChangeSuccessOff = $rootScope.$on('$locationChangeSuccess', locationChangeSuccess);

        var routeChangeStartOff = $rootScope.$on('$routeChangeStart', routeChangeStart);
        var routeChangeSuccessOff = $rootScope.$on('$routeChangeSuccess', routeChangeSuccess);

        var timer ;
        function locationChangeStart(event , newUrl) {
           // locationChangeStartOff(); //Stop listening for location changes or you can do others
           // mePageLoading.show('Parallelogram');
           // event.preventDefault();
            cfpLoadingBar.start();
            $rootScope.loadingShow = true ;
            return;
        }

        function locationChangeSuccess(event) {
            // timer && clearTimeout(timer);
            //timer = setTimeout(function(){ mePageLoading.hide()},2000)
            //event.preventDefault();
            cfpLoadingBar.complete();
            $rootScope.loadingShow = false ;
            return;
        }

        function routeChangeStart(event) {

            //   $log.log('routeChangeStart');
        }

        function routeChangeSuccess(event) {

         //   $log.log('routeChangeSuccess');

        }

        $('#page-loading').removeClass('in');
    }
])

// Your app's root module...
angular.module('app.http.post', [], function($httpProvider) {
    // Use x-www-form-urlencoded Content-Type
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

    /**
     * The workhorse; converts an object to x-www-form-urlencoded serialization.
     * @param {Object} obj
     * @return {String}
     */
    var param = function(obj) {
        var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

        for(name in obj) {
            value = obj[name];

            if(value instanceof Array) {
                for(i=0; i<value.length; ++i) {
                    subValue = value[i];
                    fullSubName = name + '[' + i + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            }
            else if(value instanceof Object) {
                for(subName in value) {
                    subValue = value[subName];
                    fullSubName = name + '[' + subName + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            }
            else if(value !== undefined && value !== null)
                query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
        }

        return query.length ? query.substr(0, query.length - 1) : query;
    };

    // Override $http service's default transformRequest
    $httpProvider.defaults.transformRequest = [function(data) {
        return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    }];
})
