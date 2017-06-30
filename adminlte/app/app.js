// Make sure to include the `ui.router` module as a dependency
// api http://docs.angularjs.cn/api

//var appVersion = "?" + version, appDev = dev;
var appVersion = "?v=" + new Date().getTime(),
    appDev = true;
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


var app = angular.module('app', [
    'utils.service',
    'utils.directive',
    'utils.filter',
    'utils.datepicker',
    'ui.router',
    'oc.lazyLoad',
    'app.router',
    //  'ngAnimate',
    'ngMessages',
    'ngCookies',
    'ui.bootstrap',
    'angular-loading-bar',
    'ngFileUpload',
    'http.post'
]);

// 全局变量
app.constant('MBS_DOMAIN', 'http://open.273.cn');
app.constant('OUT_DOMAIN', 'http://out.api.273.cn');
app.constant('PAGINATION', {
    maxSize: 10,
    currentPage: 1,
    pageSize: 10
});


app.config(["$stateProvider", "$urlRouterProvider", "$httpProvider", "$ocLazyLoadProvider", "$locationProvider", "routeProvider",
    function ($stateProvider, $urlRouterProvider, $httpProvider, $ocLazyLoadProvider, $locationProvider, routeProvider) {
        $ocLazyLoadProvider.config({
            //loadedModules: ['monitorApp']//主模块名,和ng.bootstrap(document, ['monitorApp'])相同
            jsLoader: function (files, callback, params) {
                seajs.use(files, callback)
            }, //使用requirejs去加载文件
            // files: ['modules/summary','modules/appEngine','modules/alarm','modules/database'],
            // 主模块需要的资源，这里主要子模块的声明文件
            debug: false
        });

        $httpProvider.defaults.withCredentials = true;
        $httpProvider.defaults.headers.content = true;
        // 错误的路由重定向
        $urlRouterProvider.otherwise('/settlement/order/orderList/');
        //$urlRouterProvider.otherwise('/mbs/index/home');


        routeProvider.init();

        routeProvider.stateSub( 'chefubao-simulation-request.getOrderInfo', {
            page: { title: '获取订单信息' },
            files : ["app/chefubao/simulation/request/getOrderInfo.js"],
            controller: 'controller.chefubao.simulation.request.getOrderInfo'
        });
        routeProvider.stateSub( 'chefubao-simulation-request.uploadSign', {
            page: { title: '上传签购单' },
            files : ["app/chefubao/simulation/request/uploadSign.js"],
            controller: 'controller.chefubao.simulation.request.uploadSign'
        });
        routeProvider.stateSub( 'chefubao-simulation-request.payNotice', {
            page: { title: '支付通知' },
            files : ["app/chefubao/simulation/request/payNotice.js"],
            controller: 'controller.chefubao.simulation.request.payNotice'
        });
        routeProvider.stateSub( 'chefubao-simulation-request.getOrderList', {
            page: { title: '获取订单列表' },
            files : ["app/chefubao/simulation/request/getOrderList.js"],
            controller: 'controller.chefubao.simulation.request.getOrderList'
        });
        routeProvider.stateSub( 'chekuangbao-assign-getOrderList.getOrderInfo', {
            page: { title: '订单管理系统' },
            files : ["app/chekuangbao/assign/getOrderList/getOrderInfo.js"],
            controller: 'controller.chekuangbao.assign.getOrderList.getOrderInfo'
        });
        routeProvider.stateSub( 'chekuangbao-assign-getOrderList.unSignOrder', {
            page: { title: '订单管理系统' },
            files : ["app/chekuangbao/assign/getOrderList/unSignOrder.js"],
            controller: 'controller.chekuangbao.assign.getOrderList.unSignOrder'
        });
        routeProvider.stateSub( 'chekuangbao-assign-getOrderList.assignedOrder', {
            page: { title: '订单管理系统' },
            files : ["app/chekuangbao/assign/getOrderList/assignedOrder.js"],
            controller: 'controller.chekuangbao.assign.getOrderList.assignedOrder'
        });
        routeProvider.stateSub( 'chekuangbao-assign-getOrderList.completeOrder', {
            page: { title: '订单管理系统' },
            files : ["app/chekuangbao/assign/getOrderList/completeOrder.js"],
            controller: 'controller.chekuangbao.assign.getOrderList.completeOrder'
        });
        routeProvider.stateSub( 'chekuangbao-assign-getOrderList.cancelOrder', {
            page: { title: '订单管理系统' },
            files : ["app/chekuangbao/assign/getOrderList/cancelOrder.js"],
            controller: 'controller.chekuangbao.assign.getOrderList.cancelOrder'
        });
        routeProvider.stateSub( 'chekuangbao-assign-getOrderList.unCheckOrder', {
            page: { title: '订单管理系统' },
            files : ["app/chekuangbao/assign/getOrderList/unCheckOrder.js"],
            controller: 'controller.chekuangbao.assign.getOrderList.unCheckOrder'
        });
        $httpProvider.interceptors.push("httpInterceptor");

        // for seo
        // $locationProvider.html5Mode(true);
        // $locationProvider.hashPrefix('!');
        // window.prerenderReady = false
    }])
    // api see http://www.webdeveasy.com/interceptors-in-angularjs-and-useful-examples/
    .factory('httpInterceptor', ["$q", '$injector', function($q, $injector) {
        var interceptor = {
            'request': function(config) {
                return config;
            },
            'response': function(resp) {
                var security = $injector.get('security');
                if (resp.data && resp.data.code == 999 || resp.data && resp.data.code == 10040001) {
                    security.signout();
                }
                return resp;
            },
            'requestError': function(rejection) {
                return $q.reject(rejection);
            },
            'responseError': function(rejection) {
                return rejection
            }
        }

        return interceptor;
    }])
    .controller('controller.init', ["$scope", "$rootScope", "$stateParams", "utils", "$cookieStore", "security", "$state", "$modal",
        function($scope, $rootScope, $stateParams, utils, $cookieStore, security, $state, $modal) {

            var userInfo = $cookieStore.get("user");

            $rootScope.codeCollection = {};

            $scope.signout = function() {
                utils.loginOut($cookieStore.get("user").token).success(function(res) {
                    security.clearCookie();
                    window.location.href = '/';
                })

            }
            $rootScope.sendCodeAll = function() {
                utils.sendCodeAll().success(function(res) {
                    utils.message(res.msg);
                }).error(function() {
                    utils.message('发送失败，稍后重试！');
                })
            };
            $scope.editMobile = function() {
                $modal.open({
                    templateUrl: "tpl-editPhone.html",
                    size: 'md',
                    resolve: {
                        profile: function() {
                            return $scope.profile;
                        }
                    },
                    controller: ["$scope", "$rootScope", "$modalInstance", "$state", "utils", "profile", function(
                        $scope, $rootScope, $modalInstance, $state, utils, profile
                    ) {

                        profile.code = '';
                        $scope.submittedEdit = false;
                        $scope.interacted = function(field) {
                            return (utils.browser().msie ? (field.$dirty && $scope.submittedEdit) : (field.$dirty || $scope.submittedEdit)) || field.isblur;
                        }
                        $scope.profile = profile;
                        $scope.cancel = function() {
                            $modalInstance.dismiss('cancel');
                        }

                        utils.getUserMobile().success(function(res) {
                            $scope.profile.lastestMobile = '';
                            $scope.profile.latestMobile = '';
                            if (res.code == 0) {
                                $scope.profile.latestMobile = res.data.mobile;
                            }
                        }).error(function() {})

                        $scope.postMobile = function(isValid) {
                            $scope.submittedEdit = true;
                            if (isValid) {
                                utils.postMobile({
                                    mobile: profile.lastestMobile,
                                    code: profile.code
                                }).success(function(res) {
                                    if (res.code == 0) {
                                        utils.message(res.data);

                                        $modalInstance.dismiss('cancel');
                                    } else {
                                        utils.message(res.msg);
                                    }
                                })
                            }
                        }

                    }]
                });
            }

            var hash = window.location.hash;
            var arr = hash.substring(hash.indexOf('?') + 1, hash.length).split('&'),
                query = {};
            for (var i = 0; i < arr.length; i++) {
                var item = arr[i].split('=');
                query[item[0]] = item[1];
            }

            function setMenus(userInfo) {
                var $sideMenus = $('.sidebar-menu');

                if (userInfo.username == 'admin') {
                    var $elem = $sideMenus.find('[ui-sref]').closest('li');
                    var $node = $elem.closest('.treeview');
                    if ($node.is(':hidden')) $node.stop(true, true).slideDown();
                    $elem.stop(true, true).show();
                    return;
                }

                utils.getCurrentCodes(userInfo).success(function(res) {
                    $rootScope.codeCollection = res.data;
                    $sideMenus.find('[ui-sref]').each(function() {
                        var sref = $(this).attr('ui-sref').toLowerCase(),
                            $elem = $(this).closest('li');
                        if (sref.indexOf('(') != -1)
                            sref = sref.substring(0, sref.indexOf('('));
                        if (sref.indexOf('.') != -1)
                            sref = sref.substring(0, sref.indexOf('.'));
                        var codes = $rootScope.codeCollection.codes;

                        for (var i = 0; i < codes.length; i++) {
                            if (sref == codes[i].replace(/\./g, '-').replace(/\|/g, '-')) {
                                if ($elem.length && $elem.is(':hidden')) {
                                    var $node = $elem.closest('.treeview');
                                    if ($node.is(':hidden')) $node.stop(true, true).slideDown();
                                    $elem.stop(true, true).show();
                                }
                            }
                        }
                    })

                    $('.content-wrapper').css('min-height', 900)
                })
            }

            if (query.appId && query.token && query.type == 1) {
                utils.loginByToken(query).success(function(res) {
                    if (res.code == 0) {
                        var user = res.data;
                        user.token = query.token;
                        $cookieStore.put('user', $scope.profile = user);
                        setMenus(user);
                        security.signin();
                    } else {
                        // message(res.msg);
                    }
                }).error(function() {
                    //   message("无法访问！");
                })
            } else {
                if (!userInfo) {
                    security.signout();
                } else {
                    setMenus(userInfo);
                    $scope.profile = userInfo;
                    if (!$.cookie('token')) {
                        utils.getToken().success(function(data) {
                            $.cookie('token', data.data.access_token);
                            $scope.profile.token = data.data.access_token;
                            $cookieStore.put('user', $scope.profile);
                        })
                    }
                }
            }


            $scope.submitted = false;
            $scope.interacted = function(field) {
                return field.$dirty || $scope.submitted || field.isblur;
            }

            $scope.submitForm = function(isValid) {
                $scope.submitted = true;
                var message = function(msg) {
                    $('#tips-info').html('<i class="fa fa-info-circle"></i> ' + msg);
                }
                if (!isValid) {
                    //message("验证失败!");
                } else {
                    utils.getToken().success(function(data) {
                        if (data.code == 0) {
                            $scope.user.token = data.data.access_token;
                            $scope.user.password = $.md5($scope.user.password);
                            if (data.code == 0) {
                                $.cookie('token', data.data.access_token, {
                                    expires: 1 / 12,
                                    secure: true
                                });
                                utils.login($scope.user).success(function(res) {
                                    if (res.code == 0) {
                                        var user = res.data;
                                        user.token = $scope.user.token;
                                        $cookieStore.put('user', $scope.profile = user);
                                        setMenus(user);
                                        security.signin();
                                    } else {
                                        message(res.msg);
                                    }
                                });
                            } else {
                                message(data.msg);
                            }
                        } else {
                            message(data.msg);
                        }
                    }).error(function() {
                        message("无法访问！");
                    })
                }
            };
        }
    ])
    .run(["$rootScope", "$state", "$stateParams", "$window", "$location", "$log", "$http", "cfpLoadingBar", "datepickerTemplateCache",
        function($rootScope, $state, $stateParams, $window, $location, $log, $http, cfpLoadingBar, datepickerTemplateCache) {
            // It's very handy to add references to $state and $stateParams to the $rootScope
            // so that you can access them from any scope within your applications.For example,
            // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
            // to active whenever 'contacts.list' or one of its decendents is active.

            $state.in = function(node) {
                if (typeof node == 'object') {
                    var res = false;
                    for (var i = 0; i < node.length; i++) {
                        var n = node[i];
                        n = n.replace(/-/g, '/');
                        var arr = $state.$current.name.split('-');
                        if (n == arr[1]) {
                            res = true;
                            break;
                        }
                    }
                    return res;
                } else {
                    var arr = $state.$current.name.split('-');
                    return node == arr[0];
                }

            }

            // 修复高 .content-wrapper 高度不正确问题
            var $content = $('.content-wrapper'),
                $main = $('.main-sidebar');
            $(window).scroll(function() {
                var minHeight = parseFloat($content.css('min-height')),
                    sidebarHeight = $main.height();
                if (sidebarHeight > minHeight) {
                    $content.css('min-height', sidebarHeight);
                }
            });

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
                $('#page-loading').addClass('in');
                return;
            }

            function locationChangeSuccess(event) {
                // timer && clearTimeout(timer);
                // timer = setTimeout(function(){ mePageLoading.hide()},2000)
                // event.preventDefault();
                //  cfpLoadingBar.complete();

                $('#page-loading').removeClass('in');
                return;
            }

            function routeChangeStart(event) {
                //   $log.log('routeChangeStart');
            }

            function routeChangeSuccess(event) {
                //   $log.log('routeChangeSuccess');
            }

            //$('#page-loading').removeClass('in');

            // 时间控件模版初始化
            datepickerTemplateCache.reset();


        }
    ])

/* .directive('onFinishRenderFilters', function ($timeout) {
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
 require: '?ngModel',
 scope : {
 shown: '='
 },
 template : '<div class="loading"></div>',
 link : function( $scope  , $element , $attrs , ngModel ){
 $scope.$watch( $scope.shown, function ( val ) {
 if ( val ) {
 $element.addClass('in');
 } else {
 $element.removeClass('in');
 }
 });
 },
 controller: function($scope, $element){
 }
 }
 })*/
