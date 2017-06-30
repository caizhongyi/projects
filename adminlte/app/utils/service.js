angular.module('utils.service', [])
    // 常用类
    .service('utils', ["$http", "$filter", "MBS_DOMAIN", "$cookieStore", "$state", "$rootScope", "$timeout", "$modal",
        function ($http, $filter, MBS_DOMAIN, $cookieStore, $state, $rootScope, $timeout, $modal) {
            var token = $.cookie('token');
            var self = this;

            this.message = function ( msg , autoClose ) {
                autoClose = autoClose == null ? true : false;
                function message(msg) {
                    $modal.open({
                        template: ' <div class="modal-header">\
                    <button aria-label="Close" data-dismiss="modal" class="close" type="button" ng-click="cancel()"><span aria-hidden="true">×</span></button>\
                    <h3 class="modal-title">提示</h3>\
                    </div>\
                    <div class="modal-body">\
                    <form role="form">\
                    <div class="box-body text-center">\
                        ' + msg + '\
                    </div><!-- /.box-body -->\
                    </form>\
                    </div>\
                    <div class="modal-footer">\
                    <button class="btn btn-primary modv2-btn" ng-click="cancel()" type="button" >关闭</button>\
                    </div>',
                        resolve: {},
                        size: 'sm',
                        controller: ["$scope", "$rootScope", "$modalInstance", "$state", "$timeout", function ($scope, $rootScope, $modalInstance, $state, $timeout) {
                            if( autoClose ){
                                $timeout(function () {
                                    $modalInstance.dismiss('cancel');
                                }, 1500)
                            }

                            $scope.cancel = function () {
                                $modalInstance.dismiss('cancel');
                            }
                        }]
                    });
                }

                if (typeof msg == 'string') {
                    message(msg);
                    return;
                }
                var html = '';
                for (var i in msg) {
                    html += i + ':' + msg[i].join(',') + '\n';
                }
                ;
                message(html);
            }

            /**
             * 判断是否有权限
             * */
            this.hasCode = function (code) {
                var userInfo = $cookieStore.get("user");
                if (!userInfo || userInfo.username == 'admin') {
                    return true;
                }
                if ($rootScope.codeCollection && $rootScope.codeCollection.codes) {
                    var res = false, codes = $rootScope.codeCollection.codes;
                    for (var i = 0; i < codes.length; i++) {
                        if (codes[i] == code) {
                            return true;
                        }
                    }
                }
                else {
                    $timeout(function () {
                        self.hasCode(code);
                    }, 500)
                }

                return res;
            }


            /**
             * 判断是否有角色权限
             * */
            this.hasRoleCode = function (role) {
                var userInfo = $cookieStore.get("user");
                if (!userInfo || userInfo.username == 'admin') {
                    return true;
                }
                var roleCodes = role.split(',');

                if ($rootScope.codeCollection && $rootScope.codeCollection.roleCodes) {
                    var res = false, codes = $rootScope.codeCollection.roleCodes;
                    for (var i = 0; i < codes.length; i++) {
                        for (var j = 0; j < roleCodes.length; j++) {
                            if (codes[i] == roleCodes[j]) {
                                return true;
                            }
                        }
                    }
                }
                else {
                    $timeout(function () {
                        self.hasRoleCode(role);
                    }, 500)
                }
                return res;
            }

            /**
             * 获取token
             * */
            this.getToken = function () {
                return $http.get(MBS_DOMAIN + '/Oauth/Index/getToken/token/1?client_id=testclient&secret=testpass&type=client_credentials');
            };

            /**
             * 登录
             * */
            this.login = function (user) {
                return $http.post(MBS_DOMAIN + '/Passport/Users/login/token/' + user.token, user);
                // return $http({ url : MBS_DOMAIN + '/User/Users/login/access_token/' + user.token,  method : 'post', data : user });
            };


            this.loginByToken = function (params) {
                return $http.post(MBS_DOMAIN + '/Settlement/Login/index', params);

            }

            this.loginOut = function (token) {
                return $http.get(MBS_DOMAIN + '/Passport/Users/loginout/?access_token=' + token);

            }

            //提交手机修改
            this.postMobile = function (params) {
                return $http.post(MBS_DOMAIN + '/Settlement/Common/editMobile', params);
            }
            // 发送验证码，huph@273.cn
            this.sendCodeAll = function(){
                return $http.get(MBS_DOMAIN + '/Settlement/Common/sendCodeAll');
            }

            this.islogin = function () {
                return $cookieStore.get('user') ? true : false;
                // return $.cookie('user') ? true : false;
            }

            this.getCooikeUserInfo = function () {
                return $cookieStore.get('user') || {};
            }

            this.getUserInfo = function (id) {
                return $http.get(MBS_DOMAIN + '/Passport/Users/personalData?id=' + id)
            }
            this.getUserMobile = function () {
                return $http.get(MBS_DOMAIN + '/Settlement/Common/getMobile')
            }

            /**
             * 获取权限码
             * */
            this.getCurrentCodes = function (user) {
                return $http.get(MBS_DOMAIN + '/ACL/Index/getCurrentCodes/' + user.id)
            }


            this.notice = function () {
                return $http.get(MBS_DOMAIN + '/User/Friends/getFocusNotice/access_token/1')
            }
            /**
             * 查找用户
             * */
            this.searchUsers = function (keyword, page, page_size) {
                return $http.post(MBS_DOMAIN + '/Passport/Users/search2/token/' + token, {
                    keyword: keyword || '',
                    page: page,
                    page_size: page_size
                });
            }

            this.findById = function findById(a, id) {
                for (var i = 0; i < a.length; i++) {
                    if (a[i].id == id) return a[i];
                }
                return null;
            }

            this.newRandomKey = function newRandomKey(coll, key, currentKey) {
                var randKey;
                do {
                    randKey = coll[Math.floor(coll.length * Math.random())][key];
                } while (randKey == currentKey);
                return randKey;
            }

            this.dateFormat = function (date) {
                return $filter('date')(date, 'yyyy-MM-dd');
            }

            this.browser = function () {
                var browser = {};
                var ua = navigator.userAgent.toLowerCase();
                browser.mozilla = /firefox/.test(ua) || ua.match(/gecko|khtml/i);//火狐内核
                browser.webkit = /webkit/.test(ua) || ua.match(/applewebkit/i);//苹果、谷歌内核
                browser.opera = /opera/.test(ua) || ua.match(/repsto/i);//opera内核
                browser.msie = /msie/.test(ua) || ua.match(/trident/i);//IE内核
                browser.mobile = !!ua.match(/applewebkit.*mobile.*/) || !!ua.match(/applewebkit/) || ua.match(/iphone|ipod|ipad|android|symbianos|ios|windows phone|windows ce|ucweb|rv:1.2.3.4|midp/i); //是否为移动终端
                browser.ios = !!ua.match(/\(i[^;]+;( u;)? cpu.+mac os x/);//ios终端
                browser.android = ua.match(/android|linux/i);//android终端或者uc浏览器
                browser.iPhone = ua.match(/iphone/i);
                browser.iPad = ua.match(/ipad/i);
                browser.uc = ua.match(/ucweb|rv:1.2.3.4/i);
                browser.midp = ua.match(/midp/i);
                browser.safari = ua.match(/safari/i);//是否web应该程序，没有头部与底部
                browser.language = (navigator.browserLanguage || navigator.language).toLowerCase()

                browser.msie && (function () {

                })();
                return browser;
            }


        }])
    // 操作模块类
    .service("modules", ["$http", "MBS_DOMAIN", function ($http, MBS_DOMAIN) {
        this.getAll = function () {
            return $http.get(MBS_DOMAIN + '/ACL/Index/getAllModuleName');
        }
        this.getCodeByName = function (name) {
            return $http.get(MBS_DOMAIN + '/ACL/Index/getCodeByModuleName/' + name);
        }
    }])
    // 区域门店选择类
    .service("area", ["$http", "MBS_DOMAIN", function ($http, MBS_DOMAIN) {
        //   var MBS_DOMAIN = "http://api.cherenmai.com";
        this.province = function () {
            return $http.get(MBS_DOMAIN + '/Cache/Location/getProvinceList/?acceess_token=1');
        }
        this.city = function (provinceId) {
            return $http.get(MBS_DOMAIN + '/Cache/Location/getCityListByProvinceId/?acceess_token=1&id=' + provinceId);
        }
        this.cityDetail = function (id) {
            return $http.get(MBS_DOMAIN + '/Cache/Location/getCityDetailById/?acceess_token=1&id=' + id);
        }
        this.destrict = function (cityId) {
            return $http.get(MBS_DOMAIN + '/Cache/Location/getDestrictListByCityId/?acceess_token=1&id=' + cityId);
        }
        this.shop = function (cityId) {
            return $http.get(MBS_DOMAIN + '/Cache/Dept/getAllDeptListByCity/?acceess_token=1&city_id=' + cityId);
        }
        this.carfee = function () {
            return $http.get(MBS_DOMAIN + '/Cache/Carfee/getCarFeeTypeList/access_token/1/city_id/' + 1);
        }
        this.saleMan = function( dept_id ){
            return $http.post(MBS_DOMAIN + '/Settlement/MbsUser/getSaleManListByDeptId' , { dept_id : dept_id } );
        }

    }])
    // modal 类型的信息弹出窗口
    .service('messageControl', ['$modal', function ($modal) {
        this.show = function ($scope, fn, size) {
            var item = this.item;
            var controller = ["$scope", "$rootScope", "$modalInstance", "item", "$state", function ($scope, $rootScope, $modalInstance, item, $state) {
                $scope.messageOk = function () {
                    $modalInstance.dismiss('cancel');
                    fn.ok();
                }
                $scope.messageCancle = function () {
                    fn.cancel();
                    $modalInstance.dismiss('cancel');
                }
            }]

            if (typeof fn == 'function' || ( angular.isArray(fn) )) {
                controller = fn;
            }

            $modal.open({
                templateUrl: 'tpl-message.html',
                resolve: {
                    item: function () {
                        return item;
                    }
                },
                size: size || 'md',
                controller: controller
            });
        }
    }])
    // 缓存
    .service('cache', function () {
        var cacheArray = {};
        this.set = function (key, value) {
            cacheArray[key] = value;
        },
            this.get = function (key) {
                return cacheArray[key];
            }
    })
    .service('security', ["$cookieStore", "$state", "$location", function ($cookieStore, $state, $location) {
        var _this = this;
        this.status = 0;
        /**
         * @description : 浏览器判断jquery 1.8以上不支持时补加
         * */
        this.signin = function (data) {
            if (data) $cookieStore.put('user', data);
            $('#main').stop(true, true).fadeIn();
            $('#login-box').hide();
            $state.go($state.current.name, {}, {reload: true});
            _this.status = 1;
        }
        this.signout = function () {
            $('#login-box').stop(true, true).fadeIn();
            $('#main').hide();
            _this.status = 0;
            this.clearCookie();
        }

        this.clearCookie = function () {
            $cookieStore.remove("user");
        }

        this.isLogin = function () {
            return $cookieStore.get("user");
        }
    }]
).service('fileupload', ["Upload", "$timeout", "utils", function (Upload, $timeout, utils) {

        var self = this;


        this.upload = function (files, callback) {
            function upload(file, callback) {

            /*   new fileCompress().getFile( file ,function(file){

                })*/
                if (!file.uploaded)
                    uploadS3(file, callback);
            }

            function uploadUsingUpload(file) {
                file.upload = Upload.upload({
                    url: 'http://upload.273.com.cn/',
                    method: 'POST',
                    headers: {
                        'my-header': 'my-header-value'
                    },
                    fields: {
                        thumbHeight: 200,
                        thumbWidth: 200,
                        category: 'change'
                    },
                    file: file,
                    fileFormDataName: 'file'
                });

                file.upload.then(function (response) {
                    $timeout(function () {
                        file.result = response.data;
                    });
                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                });

                file.upload.progress(function (evt) {
                    // Math.min is to fix IE which reports 200% sometimes
                    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                });

                file.upload.xhr(function (xhr) {
                    // xhr.upload.addEventListener('abort', function(){console.log('abort complete')}, false);
                });
            }

            function uploadUsing$http(file) {
                file.upload = Upload.http({
                    url: 'http://upload.273.com.cn/',
                    method: 'POST',
                    headers: {
                        'Content-Type': file.type
                    },
                    data: file
                });

                file.upload.then(function (response) {
                    file.result = response.data;
                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                });

                file.upload.progress(function (evt) {
                    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                });
            }

            function uploadS3(file, callback) {
                if (file.size / 1024000 > 5) {
                    utils.message('上传的图片不能超过4M');
                    return;
                }
                file.upload = Upload.upload({
                    url: 'http://upload.273.com.cn/',
                    method: 'POST',
                    fields: {
                        thumbHeight: 200,
                        thumbWidth: 200,
                        category: 'change'
                    },
                    /*   fields: {
                     key: file.name,
                     AWSAccessKeyId: $scope.AWSAccessKeyId,
                     acl: $scope.acl,
                     policy: $scope.policy,
                     signature: $scope.signature,
                     'Content-Type': file.type === null || file.type === '' ? 'application/octet-stream' : file.type,
                     filename: file.name
                     },*/
                    file: file
                });

                file.upload.then(function (response) {
                    $timeout(function () {
                        //  file.result = response.data;
                        file.completed = true;
                        file.url = response.data.url;
                        file.file_path = response.data.file_path;
                        callback && callback(file, response);
                    });
                }, function (response) {
                    /* if (response.status > 0)
                     $scope.errorMsg = response.status + ': ' + response.data;*/
                });

                file.upload.progress(function (evt) {
                    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                });
                //   storeS3UploadConfigInLocalStore();
            }

            if (files != null) {
                if (files.length) {
                    for (var i = 0; i < files.length; i++) {
                        //   $scope.errorMsg = null;
                        (function (file) {
                            upload(file, callback);
                        })(files[i]);
                    }
                }
                else {
                    upload(files, callback);
                }
            }
        }

        this.remove = function (files, i) {
            files && files.splice(i, 1)
        }

        this.filedToObject = function (files) {
            var f = [];
            if (files != null) {
                files = typeof files == 'string' ? files.split(',') : files;
                files.forEach(function (n) {
                    f.push({
                        name: n,
                        url: n.url,
                        file_path: n.file_path,
                        type: 'image/*',
                        uploaded: true
                    })
                })
            }
            return f;
        }

        this.objectTofiled = function (files) {
            var f = [];
            if (files) {
                files.forEach(function (n) {
                    f.push(n.file_path)
                })
            }

            return f.join(',');
        }

        this.isCompleted = function () {
            for (var i = 0; i < files.length; i++) {
                if (!file[i].completed) {
                    return;
                }
            }
            self.completed = true;
        }

        this.completed = false;
    }])
/*    .service('dateFilter',function( $filter ){
 var dateFilter = $filter('date');
 this.toString = function( date ){
 if( typeof date == 'object'){
 return dateFilter(date,'yyyy-MM-dd');
 }
 else{
 return date;
 }
 }

 this.toDate = function( date ){
 if( typeof date == 'string'){
 return new Date(date);
 }
 if( typeof date == 'number'){
 return new Date( date  * 1000 );
 }
 else{
 return date;
 }
 }
 })*/
