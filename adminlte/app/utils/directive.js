angular.module('utils.directive', ['ui.bootstrap'])
    // 美化版ckeckbox
    .directive('icheck', ['$timeout', function ($timeout) {
        return {
            restrict: 'A',
            scope: {},
            link: function (scope, element, attrs) {
                var defaults = {
                    checkboxClass: 'icheckbox_flat-blue',
                    radioClass: 'iradio_flat-blue'
                }
                // if (scope.$last === true) {
                $timeout(function () {
                    //scope.$emit('ngPaginationFinished');
                    element.iCheck(angular.extend(defaults, attrs));
                });
                //}
            }
        }
    }])
    // 浮层固定
    .directive('affix', ['$timeout', function ($timeout) {
        return {
            restrict: 'A',
            scope: {},
            link: function (scope, element, attrs) {
                var defaults = {}
                // if (scope.$last === true) {
                $timeout(function () {
                    //scope.$emit('ngPaginationFinished');
                    element.affix({
                        /* offset: {
                         top: -300,
                         bottom: function () {
                         return (this.bottom = $('.footer').outerHeight(true))
                         }
                         }*/
                    })
                });
                //}
            }
        }
    }])
    // 时间格式化
    .directive('dateFormat', ['$filter', function ($filter) {
        var dateFilter = $filter('date');
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {

                function formatter(value) {
                    return dateFilter(value, 'yyyy-MM-dd'); //format
                }

                function parser() {
                    return ctrl.$modelValue;
                }

                ctrl.$formatters.push(formatter);
                ctrl.$parsers.unshift(parser);

            }
        };
    }])
    // 时间格式化
    .directive('dateFormatForPhp', ['$filter', function ($filter) {
        var dateFilter = $filter('date');
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {

                function formatter(value) {
                    return dateFilter(value * 1000, 'yyyy-MM-dd'); //format
                }

                function parser() {
                    return ctrl.$modelValue;
                }

                ctrl.$formatters.push(formatter);
                ctrl.$parsers.unshift(parser);

            }
        };
    }])
    .directive('hintOnBlur', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                element.bind('focus', function () {
                    $('#tips-info').html('');
                    scope.$apply(function () {
                        ngModel.isblur = false;
                        // ngModel.$setValidity('recordLoading', !bool);
                    });
                }).bind('blur', function () {
                    scope.$apply(function () {
                        ngModel.isblur = true;
                        //  ngModel.$setValidity('recordLoading', !bool);
                    });
                });
            }
        }
    })
    // 时间控件
    .directive("datepickerClick", ["$filter", function ($filter) {
        return {
            require: '?ngModel',
            link: function ($scope, elm, attrs, ctrl) {
                elm.click(function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    $scope[attrs.datepickerClick] = true;
                    $scope.$apply();
                })

                var $input = elm.find('[type=datetime]');
                var modelName = $input.attr('ng-model');
                var syncName = $input.attr('sync')

                if (syncName) {
                    $scope.$watch(syncName, function (val, oldVal) {
                        new Function('$scope', 'date', "return $scope." + modelName + '= date;')($scope, val);
                    })
                    $scope.$watch(modelName, function (val, oldVal) {
                        if (typeof val == 'object') {
                            new Function('$scope', 'date', "return $scope." + syncName + '= date;')($scope, $filter('date')(val, 'yyyy-MM-dd'));
                        }
                        else
                            new Function('$scope', 'date', "return $scope." + syncName + '= date;')($scope, val);
                    })
                }
            }
        }
    }])

    /**
     * 日历选择
     * <ung-datepicker ng-model="ueditor"></<ung-datepicker>
     * */
    .directive("ungDatepicker", ["$filter", "$parse", "datepickerConfig",function ($filter, $parse ,datepickerConfig) {
        return {
            require: '?^ngModel',
            replace: true,
            template: '<input  type="datetime"  class="form-control" placeholder="日/月"  datepicker-popup="yyyy-MM-dd"   current-text="今天" clear-text="清空" close-text="关闭"  readonly  />',
            transclude: true,
            link: function ($scope, elm, attrs, ngModel) {

                elm.on('click' , function(){

                    var $dropdown  = $(this).next('.dropdown-menu');
                    if( elm.offset().top - $(window).scrollTop() > $(window).height() / 2){
                        $dropdown.css('top' , - $dropdown.height() - elm.height() + 5 )
                    }
                    else{
                        $dropdown.css('top' , 0 + elm.height() + 13  )
                    }

                    if( elm.offset().left - $(window).scrollLeft() >= $(window).width() / 2){
                        $dropdown.css('left' ,  elm.width() - $dropdown.width() + 13 )
                    }
                    else{
                        $dropdown.css('left' ,  0 )
                    }
                    $(this).next('.dropdown-menu').show().off('click.datepicker').on('click' ,'tbody .btn,li:eq(1) .btn',function(){
                        $(this).closest('.dropdown-menu').hide();
                    })

                    $(document).off('click.datepicker').on('click.datepicker', function(){
                        elm.next('.dropdown-menu').hide();
                    })
                })

                elm.on('click' , function(e){
                    e.stopPropagation();
                }).next('.dropdown-menu').on('click' , function(e){
                    e.stopPropagation();
                })

                $scope.$watch( attrs.ngModel , function( val ){
                    if( typeof val == 'object'){
                        $parse( attrs.ngModel ).assign( $scope , $filter('date')( val , 'yyyy-MM-dd') )
                    }
                })
            }
        }
    }])

    /**
     * 日历选择，只到月
     * <ung-datepicker-month ng-model="ueditor"></<ung-datepicker-month>
     * */
    .directive("ungDatepickerMonth", ["$filter", "$parse","datepickerConfig", function ($filter, $parse,datepickerConfig) {
        return {
            require: '?^ngModel',
            replace: true,
            template: '<input  type="datetime"  class="form-control" placeholder="日/月"  datepicker-popup="yyyy-MM"   datepicker-options="{ datepickerMode : \'month\', minMode : \'month\'}" current-text="今天" clear-text="清空" close-text="关闭"  readonly  />',
            transclude: true,
            link: function ($scope, elm, attrs, ngModel) {
            //    $scope.toggleMode()
                var isSwitched = false;
                elm.on('click' , function(){
                    var $dropdown  = $(this).next('.dropdown-menu');
                    if( !isSwitched ){
                        $dropdown.find('[role=heading]').click()
                    }
                    isSwitched = true;
                    if( elm.offset().top - $(window).scrollTop() > $(window).height() / 2){
                        $dropdown.css('top' , - $dropdown.height() - elm.height() + 5 )
                    }
                    else{
                        $dropdown.css('top' , 0 + elm.height() + 13  )
                    }

                    if( elm.offset().left - $(window).scrollLeft() >= $(window).width() / 2){
                        $dropdown.css('left' ,  elm.width() - $dropdown.width() + 13 )
                    }
                    else{
                        $dropdown.css('left' ,  0 )
                    }
                    $(this).next('.dropdown-menu').show().off('click.datepicker').on('click' ,'tbody .btn,li:eq(1) .btn',function(){
                        $(this).closest('.dropdown-menu').hide();
                    })

                    $(document).off('click.datepicker').on('click.datepicker', function(){
                        elm.next('.dropdown-menu').hide();
                    })
                })

                elm.on('click' , function(e){
                    e.stopPropagation();
                }).next('.dropdown-menu').on('click' , function(e){
                    e.stopPropagation();
                })

                $scope.$watch( attrs.ngModel , function( val ){
                    if( typeof val == 'object'){
                        $parse( attrs.ngModel ).assign( $scope , $filter('date')( val , 'yyyy-MM') )
                    }
                })
            }
        }
    }])
    // 弹出窗口提示
    .directive("modalOpen", ["$modal", function ($modal) {
        return {
            require: '?ngModel',
            link: function ($scope, elm, attrs, ctrl) {
                var scope = $scope;

                elm.click(function () {
                    $scope.$broadcast('modalOpen');
                    $modal.open({
                        templateUrl: attrs.modalOpen,
                        resolve: {
                            item: function () {
                                return $scope.item;
                            }
                        },
                        size: attrs.size || 'md', 
                        controller: attrs.controller || controller
                    });
                })
                var controller = ["$scope", "$rootScope", "$modalInstance", "item", "$state", function ($scope, $rootScope, $modalInstance, item, $state) {
                    $scope.ok = function (options) {
                        $rootScope.$emit('modalOk', {$modalInstance: $modalInstance, $scope: $scope}, options);
                    }
                    $scope.cancel = function (options) {
                        $modalInstance.dismiss('cancel');
                        $rootScope.$broadcast('modalClose', options);
                    }
                }]
            }
        };
    }])
    /**
     * ueditor
     * <ueditor ng-model="ueditor"></ueditor>
     * */
    .directive('ueditor', function () {
        return {
            restrict: 'EA',
            require: '?ngModel',
            scope: {
                height: '@?'
            },
            link: function (scope, element, attr, ctrl) {
                /**
                 * 动态加载js文件文件
                 * @param url
                 * @param callback
                 */
                function addScript(url, callback) {
                    var elt = document.createElement("script");
                    elt.src = url;
                    elt.anysc = true;
                    if (elt.onload == null) {
                        elt.onload = function () {
                            typeof callback == 'function' && callback();
                        }
                    } else {
                        elt.onreadystatechange = function () {
                            if (elt.readyState == "loaded" || elt.readyState == "complete") {
                                typeof callback == 'function' && callback();
                            }
                        }
                    }
                    document.getElementsByTagName("body")[0].appendChild(elt);
                }

                var _self = this,
                    _initContent,
                    editor,
                    editorReady = false,
                    baseURL = "/sea_modules/ueditor/"; //写你的ue路径

                var fexUE = {
                    initEditor: function () {
                        var _self = this;
                        if (typeof UE != 'undefined') {
                            editor = new UE.ui.Editor({
                                serverUrl: baseURL + "php/controller.php",
                                initialContent: _initContent,
                                toolbars: [
                                    ['source', 'undo', 'redo', 'bold', 'italic', 'removeformat',
                                        'formatmatch', 'autotypeset', 'blockquote',
                                        'pasteplain', '|', 'forecolor', 'backcolor',
                                        'insertorderedlist', 'insertunorderedlist',"simpleupload"
                                    ]
                                ],
                                initialFrameHeight: scope.height || 300,
                                autoHeightEnabled: false,
                                wordCount: false,
                                elementPathEnabled: false
                            });


                            editor.render(element[0]);
                            editor.ready(function () {
                                editorReady = true;
                                _self.setContent(_initContent);

                                editor.addListener('contentChange', function () {
                                    scope.$apply(function () {
                                        ctrl.$setViewValue(editor.getContent());
                                    });
                                });
                            });
                        } else {

                            addScript(baseURL + 'ueditor.config.js');
                            addScript(baseURL + 'ueditor.all.min.js', function () {
                                _self.initEditor();
                            })
                        }
                    },
                    setContent: function (content) {
                        if (editor && editorReady) {
                            editor.setContent(content);
                        }
                    }
                };

                /**
                 * 当Model改变值得时候赋值。
                 */
                ctrl.$render = function () {
                    _initContent = ctrl.$isEmpty(ctrl.$viewValue) ? '' : ctrl.$viewValue;
                    fexUE.setContent(_initContent);
                };

                fexUE.initEditor();
            }
        }
    })

    /**
     *  倒计时
     *  <button count-down=""></button>
     * */
    .directive('countDown', ['$http', 'utils',function ( $http , utils ) {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, element, attrs, ngModel) {
                var timer, now,
                    endDate ,
                    diff,
                    httpPromise = "$scope." + attrs['countDown'],
                    defaultVal = $(element).val() || $(element).text() ;
                $(element).click(function(){
                    endDate = new Date().getTime() + 60 * 1000;
                    var _this = $(this).addClass('.btn-disabled').prop('disabled' , true );
                    scope.$emit('countDownStart');
                    new Function("$scope", "return " + httpPromise )( scope ).success(function( res ){
                        if( res.code == '000000' ){
                            utils.message( res.msg , false );
                            scope.$emit('countDownSuccess');
                        }else{
							utils.message( res.msg || '提交失败!' , false );
						}
                    }).error(function( res ){
                        utils.message( res.msg || '提交失败!' , false);
                    });

                    timer = setInterval(function(){
                        now = new Date().getTime();
                        diff = Math.round((endDate - now)/ 1000 ) ;
                        if( diff <= 0 ) {
                            clearInterval( timer );
                            $(_this).removeClass('.btn-disabled').prop('disabled' , false).val(defaultVal);
                            scope.$emit('countDownEnd');
                            if( $(_this)[0].tagName == 'INPUT'){
                                $(_this).val( defaultVal);
                            }
                            else{
                                $(_this).text( defaultVal );
                            }
                            return ;
                        }

                        if( element[0].tagName == 'INPUT'){
                            $(element).val( diff + '秒');
                        }
                        else{
                            $(element).text( diff + '秒');
                        }

                    },100);
                })

            }
        }
    }])
/**
 * 高级分页搜索表格
 * searchCondition 查找条件
 * 例如 ： searchCondition.name
 *
 * 弹出窗口编辑模版默认为tpl-update.html
 * */
.directive("seniorTable", ['$state', '$modal', 'PAGINATION', '$stateParams', "$filter", "$timeout", "utils", "security",'paginationConfig',
        function ($state, $modal, PAGINATION, $stateParams, $filter, $timeout, utils, security , paginationConfig) {
            return {
                require: '?ngModel',
                link: function ($scope, elm, attrs, ctrl) {

                    var self = this;
                    var isChange = false;

                    $scope.searchCondition = angular.extend({}, $stateParams) || {};

                    /*   $scope.date = $scope.searchCondition.date;
                     $scope.start_date = $scope.searchCondition.start_date;
                     $scope.end_date = $scope.searchCondition.end_date;*/

                    $scope.currentPage = $scope.currentPage || 1;
                    $scope.totalItems = $scope.totalItems || 0;
                    $scope.maxSize = PAGINATION.maxSize;
                    var pageSize = attrs.pageSize || PAGINATION.pageSize;
                    paginationConfig.itemsPerPage = pageSize;
                    $('.box-header').bind("keypress", function(event){
                        if(event.keyCode == 13) {
                            return $scope.searchInfo();
                        }
                    })

                    $scope.searchInfo = function () {
                        $scope.currentPage = 1;
                        $scope.search(true);
                        return false;
                    }
                    $scope.pageChanged = function () {
                        $scope.search();
                        return false;
                    };
                    /*function filterSearchCondition(){
                     for(var i in  $scope.searchCondition){
                     if( typeof  $scope.searchCondition[i] == 'object'){
                     $scope.searchCondition[i] = $filter('date')($scope.searchCondition[i] ,'yyyy-MM-dd')
                     }
                     }
                     }*/

                    var condition = angular.extend({}, $scope.searchCondition);
                    delete condition.currentPage;

                    /*   if( $scope.searchCondition && $scope.searchCondition.start_date ){
                     $scope.$watch('searchCondition.start_date',function( val ){
                     $scope.searchCondition.end_date = val.substring(0 , val.lastIndexOf('-')) +   $scope.searchCondition.end_date.substring( $scope.searchCondition.end_date.lastIndexOf('-') ,  $scope.searchCondition.end_date.length );
                     console.log( $scope.searchCondition.end_date );
                     })
                     }*/
                    if (!security.isLogin()) return;

                    $scope[attrs.seniorTable].get({
                        currentPage: $stateParams.currentPage || 1,
                        pageSize: pageSize || 10,
                        key: ''
                    }, condition).success(function (res) {
                        if (res.code == 0) {
                            if (res.data) {
                                $scope.list = res.data.list;
                                $scope.item = res.data;
                                $scope.totalItems = res.data.total;

                                $scope.$emit('seniorTableLoaded', res);
                            }
                            $scope.currentPage = $stateParams.currentPage || 1;
                            $(window).resize();
                        }
                        else {
                            $timeout(function () {
                                utils.message(res.msg || '服务器出错！');
                            })
                        }
                    }).error(function () {
                        utils.message('服务器无响应！');
                    })


                    $scope.search = function (isSearchBtn) {
                        // filterSearchCondition();
                        var cond = isSearchBtn ? $scope.searchCondition : $stateParams;
                        cond.currentPage = $scope.searchCondition.currentPage = $scope.currentPage;
                        $state.go($state.current.name, cond, {reload: true});
                        return this;
                    }

                    $scope.add = function () {
                        $scope.item = null;
                        $scope.update();
                    }

                    $scope.update = function () {
                        var item = this.item;

                        $modal.open({
                            templateUrl: attrs.dataTpl || 'tpl-update.html',
                            resolve: {
                                item: function () {
                                    return item;
                                },
                                obj: function () {
                                    return $scope[attrs.seniorTable];
                                },
                                parentScope: function () {
                                    return $scope;
                                }
                            },
                            size: attrs.dataSize || 'md',
                            controller: ["$scope", "$rootScope", "$modalInstance", "item", "obj", "$state", "parentScope", "utils", function ($scope, $rootScope, $modalInstance, item, obj, $state, parentScope, utils) {
                                $scope.item = item;

                                $scope.submitted = false;
                                $scope.interacted = function (field) {
                                    return field.$dirty || $scope.submitted || field.isblur;
                                }

                                $scope.car_disabled = item ? true : false;

                                $scope.submitAddForm = function (isValid) {
                                    $scope.submitted = true;
                                    if (!isValid) {
                                        // utils.message("验证失败!");
                                    }
                                    else {
                                        // $modalInstance.close($scope.selected.item);

                                        if (item)
                                            obj.update($scope.item).success(function (res) {
                                                if (res.code == 0) {
                                                    $rootScope.$emit('modalUpdateSuccess', parentScope, res);
                                                    $modalInstance.dismiss('cancel');
                                                    // callbackFn.success( res );
                                                    //  $state.go($state.current.name , { currentPage :  $rootScope.rootCurrentPage , searchName :  $rootScope.searchData.name });
                                                }
                                                else {
                                                    utils.message(res.msg);
                                                    //  callbackFn.error( res );
                                                }
                                            }).error(function () {
                                                utils.message('服务器无响应！');
                                            })
                                        else
                                            obj.add($scope.item).success(function (res) {
                                                if (res.code == 0) {
                                                    //用于不直接关闭
                                                    if (attrs.addedReload != 'false') {
                                                        if (currentPage == 0)
                                                            parentScope.reload();
                                                        else {
                                                            parentScope.searchCondition.currentPage = 0;
                                                            $state.go($state.current.name, parentScope.searchCondition);
                                                        }
                                                    }
                                                    parentScope.$emit('modalAddSuccess', parentScope, res, $modalInstance);
                                                    // callbackFn.success( res );
                                                    $modalInstance.dismiss('cancel');
                                                }
                                                else if (res.code == 2) {
                                                    parentScope.$emit('modalAddWarning', parentScope, res, $modalInstance);
                                                }
                                                else {
                                                    console.log(res);
                                                    utils.message(res.msg || res.message);
                                                    parentScope.$emit('modalAddError', parentScope, res, $modalInstance);
                                                    $state.reload();
                                                    // callbackFn.error( res );
                                                }
                                            }).error(function () {
                                                utils.message('服务器无响应！');
                                            })
                                    }
                                }

                                $scope.ok = function () {

                                };

                                $scope.cancel = function () {
                                    $modalInstance.dismiss('cancel');
                                };
                            }]
                        });
                        return this;
                    }

                    $scope.remove = function (message) {
                        if (confirm(message || "是否要删除？")) {
                            $scope[attrs.seniorTable].remove && $scope[attrs.seniorTable].remove(this.item.id).success(function (res) {
                                if (res.code == 0) {
                                    // callbackFn && callbackFn.success( res );
                                    $state.reload();
                                }
                                else {
                                    // callbackFn && callbackFn.error( res );
                                    utils.message(res.msg || res.message);
                                }
                            }).error(function () {
                                utils.message('服务器无响应！');
                            })
                        }
                        return this;
                    }
                }
            };
        }])
    /**
     *   身份证验证
     *  <input id-card-validator=""></input>
     * */
    .directive('idCardValidator', ['$http', '$parse',function ( $http , $parse ) {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, element, attrs, ngModel) {
                if (ngModel){
                    ngModel.$parsers.push(function (value) {
                        if (/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test(value) || $parse( attrs.idCardValidator )( scope ) == false ) {
                            ngModel.$setValidity('idCardValidator', true)
                        }
                        else {
                            ngModel.$setValidity('idCardValidator', false)
                        }
                        return value;
                    })
                }
            }
        }
    }])

    /**
     *   手机验证
     *  <input mobile-validator=""></input>
     * */
    .directive('mobileValidator', ['$http', function ($http) {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, element, attrs, ngModel) {
                if (ngModel)
                    ngModel.$parsers.push(function (value) {
                        if (/^(1\d{10})$/.test(value)) {
                            ngModel.$setValidity('mobileValidator', true)
                        }
                        else {
                            ngModel.$setValidity('mobileValidator', false)
                        }
                        return value;
                    })
            }
        }
    }])

    /**
     *  金钱验证
     *  <input money-validator=""></input>
     * */
    .directive('moneyValidator', ['$http', function ($http) {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, element, attrs, ngModel) {
                ngModel.$parsers.push(function (value) {
                    ///[0,100000000]/
                    /*          if(/^([0-9]+\.[0-9]+)|([1-9]+[0-9]*)$/.test(value)){
                     ngModel.$setValidity('moneyValidator', true )
                     }
                     else{
                     ngModel.$setValidity('moneyValidator', false)
                     }*/
                    if (/^\d+(\.\d{2})?$/.test(value)) {
                        ngModel.$setValidity('moneyValidator', true)
                    }
                    else {
                        ngModel.$setValidity('moneyValidator', false)
                    }
                    return value;
                })
            }
        }
    }])

    /**
     *  数字验证
     *  <input number-validator=""></input>
     * */
    .directive('numberValidator', ['$http', function ($http) {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, element, attrs, ngModel) {
                ngModel.$parsers.push(function (value) {
                    if (/^\d+(\.\d+)?$/.test(value)) {
                        ngModel.$setValidity('numberValidator', true)
                    }
                    else {
                        ngModel.$setValidity('numberValidator', false)
                    }
                    return value;
                })
            }
        }
    }])
    /**
     * 文本框最大值限定
     *  <input max-number="10"></input>
     * */
    .directive('maxNumber', ["$parse", function ($parse) {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, element, attrs, ngModel) {
                scope.$watch(attrs.ngModel, function (val) {
                    var me = $parse(attrs.ngModel), max = $parse(attrs.maxNumber)
                    if (val > max(scope)) {
                        me.assign(scope, max(scope));
                    }
                })
            }
        }
    }])

    /**
     * 图片放大旋转
     *  <div class="img-container text-center" crop-zoom="cropZoomImage" >
             <div class="image-btns">
                 <button class="btn btn-primary modv2-btn rotate-left"  type="button">左旋转</button>
                 <button class="btn btn-primary modv2-btn rotate-right" type="button">右旋转</button>
                 <button class="btn btn-primary modv2-btn delete" type="button">关闭</button>
             </div>
             <div class="image-crop">
                <img  src="{{cropZoomImage}}" />
             </div>
         </div>
     * */
    .directive('cropZoom', ["$parse", function ($parse) {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, element, attrs, ngModel) {
                var isActive = false, $crop = $(element).find('.image-crop')

                // $crop.height( element.width() );
                var width = element.data('deg', 0).width(), $img = element.find('img');

                var $loading = $crop.find('.loading');

                scope.$watch(attrs.cropZoom, function () {
                    $img.hide();
                    resize();
                    if (!$loading.length) {
                        $loading = $('<div class="loading in" style="position: absolute"></div>').appendTo($crop);
                    }
                    else {
                        $loading.show();
                    }
                    // $img.delay(1000).fadeIn()
                })


                $img.hide().on('load', function () {
                    element.data('deg', 0);
                    $(this).attr('style', '');
                    $(this).fadeIn();
                    resize();
                    $loading.hide();
                })

                function resize() {
                    var $img = element.find('img').css({
                        'position': 'absolute',
                        'margin-top': ''
                    });

                    if ($img.width() > $img.height()) {
                        if (Math.abs(element.data('deg') % 180) == 0) {
                            if ($img.width() >= width) {
                                $img.width(width);
                            }
                        }
                        else {
                            $img.css('margin-top', ( $img.width() - $img.height()) / 2);
                        }
                    }
                    else {
                        if ($img.height() >= width) {
                            //$crop.css('margin-left' , - width/ 2 );
                            $img.height(width);
                        }
                        if (Math.abs(element.data('deg') % 180) == 90) {
                            if ($img.width() > width) {
                                $img.width(width);
                            }
                            $img.css('margin-top', -( $img.height() - $img.width()) / 2);
                        }
                    }

                    if (Math.abs(element.data('deg') % 180) == 0) {
                        $crop.height($img.height() || 'auto');
                    }
                    else {
                        $crop.height($img.width() || 'auto');
                    }

                    $img.css('position', '');
                }

                element.click(function () {
                    isActive = true;
                })

                    .on('click', '.rotate-left', function () {
                        var deg = ( element.data('deg') || 0 ) - 90;
                        element.data('deg', deg);
                        resize();
                        element.find('img').css({
                            '-webkit-transform': 'rotate(' + deg + 'deg)',
                            '-moz-transform': 'rotate(' + deg + 'deg)',
                            'transform': 'rotate(' + deg + 'deg)'
                        });

                    })
                    .on('click', '.rotate-right', function () {

                        var deg = (element.data('deg') || 0) + 90;
                        element.data('deg', deg);
                        resize();
                        element.find('img').css({
                            '-webkit-transform': 'rotate(' + deg + 'deg)',
                            '-moz-transform': 'rotate(' + deg + 'deg)',
                            'transform': 'rotate(' + deg + 'deg)'
                        });


                    }).on('click', '.delete', function () {
                        scope[attrs.cropZoom] = '';
                        scope.$apply();
                    })
            }
        }
    }])
    .directive('inputMaxFee', [function () {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function ($scope, element, attrs, ngModel) {

                function sum(igore) {
                    var s = parseFloat($scope.item.car_fee || 0) + parseFloat($scope.item.brokerage || 0) + parseFloat($scope.item.transfer_fee || 0) + parseFloat($scope.item.other_fee || 0) + parseFloat($scope.item.anency_fee || 0);
                    if (igore) {
                        s = s - parseFloat($scope.item[igore])
                    }
                    return s;
                }

                var models = ["car_fee", "brokerage", "transfer_fee", "other_fee", "anency_fee"];

                models.forEach(function (n) {

                    $scope.$watch("item." + n, function (val, oldVal) {

                        if ($scope.item) {
                            var s = sum(), newVal = parseFloat($scope.item.fee || 0) - sum(n);
                            $scope.item[n] = sum() > parseFloat($scope.item.fee || 0) ? newVal : parseFloat(val || 0);
                        }
                    })
                })
            }
        }
    }])

    /**
     * auto-complete
     * <input auto-complete="" ng-model="bank"></input>
     * attrs.autoComplete 可更换，默认为银行
     * */
    .directive('autoComplete', ['$http', 'MBS_DOMAIN', '$parse', function ($http, MBS_DOMAIN, $parse) {
        return {
            restrict: 'AE',
            require: '?ngModel',
            link: function (scope, element, attrs, ngModel) {
                var defaults = {
                    // width: 300,
                    // multiple: true,
                    // matchContains: true,
                    // delay: 700,
                    // mustMatch: true,
                    scroll: true,
                    scrollHeight: 300,
                    dataType: "json",
                    //  highlightItem: false,
                    parse: function (data) {
                        return $.map(data.data.list, function (row) {
                            return {
                                data: row,
                                value: row.name,
                                result: row.name
                            }
                        });
                    },
                    formatItem: function (row, n, m) {
                        //  return "<img src='images/" + value + "'/> " + value.split(".")[0];
                        return row.name;
                    }
                }

                $.browser = $.browser || {};
                var opt = angular.extend(defaults, attrs.setting)
                var url = !attrs.autoComplete ? MBS_DOMAIN + "/Settlement/CfbLianhang/getZonghangListByName/" : MBS_DOMAIN + attrs.autoComplete;
                $(element).autocomplete(url, opt).on('result', function (e, val) {
                    $parse(attrs['ngModel']).assign(scope, val.name);
                    scope.autoCompleteName = val.name;
                    scope.$apply();
                })

            }
        }
    }])

    /**
     * 银行分支
     * <input auto-complete-series="" ng-model="branch"></input>
     *
     * */
    .directive('autoCompleteBranch', ['$http', 'MBS_DOMAIN', '$parse', function ($http, MBS_DOMAIN, $parse) {
        return {
            restrict: 'AE',
            require: '?ngModel',
            link: function (scope, element, attrs, ngModel) {
                var defaults = {
                    // width: 300,
                    // multiple: true,
                    // matchContains: true,
                    // delay: 700,
                    // mustMatch: true,
                    scroll: true,
                    scrollHeight: 300,
                    dataType: "json",
                    //  highlightItem: false,
                    parse: function (data) {
                        return $.map(data.data.list, function (row) {
                            return {
                                data: row,
                                value: row.name,
                                result: row.name
                            }
                        });
                    },
                    formatItem: function (row, n, m) {
                        //  return "<img src='images/" + value + "'/> " + value.split(".")[0];
                        return row.name;
                    }
                }

                $.browser = $.browser || {};
                var opt = angular.extend(defaults, attrs.setting)
                var url = MBS_DOMAIN + "/Settlement/CfbLianhang/getLianhangListByName/";
                $(element).autocomplete(url, opt).on('result', function (e, val) {
                    $parse(attrs['ngModel']).assign(scope, val.name);
                    scope.autoCompleteBranchName = val.name;
                    scope.$apply();
                })

            }
        }
    }])
    /**
     * 车辆品牌自动下拉
     * <input auto-complete-brand="series" ng-model="brand"></input>
     * attrs.idModel 用于存放 id 的 ng-model
     * */
    .directive('autoCompleteBrand', ['$http', 'MBS_DOMAIN', '$parse', function ($http, MBS_DOMAIN, $parse) {
        return {
            restrict: 'AE',
            require: '?ngModel',
            link: function (scope, element, attrs, ngModel) {
                var defaults = {
                    // width: 300,
                    // multiple: true,
                    // matchContains: true,
                    // delay: 700,
                    // mustMatch: true,
                    extraParams: {},
                    scroll: true,
                    scrollHeight: 300,
                    dataType: "json",
                    matchSubset: false,
                    //  highlightItem: false,
                    cache: false,
                    parse: function (res) {
                        return $.map(res.data, function (row) {
                            return {
                                data: row
                            }
                        });
                    },
                    formatItem: function (row, n, m) {
                        return '<a href="javascript:;" data-value="' + row.brand_id + '" data-series-value="' + row.series_id + '">' + row.value + '</a>';
                    }
                }

                $.browser = $.browser || {};

                var Brand = {
                    opt: angular.extend(defaults, attrs.setting),
                    url: MBS_DOMAIN + "/Basicservice/VehicleSearch/getBrandSeries",
                    $target: null,
                    isInited: false,
                    value: function (val) {
                        var _this = this;

                        if( attrs.idModel ){
                            $parse( attrs.idModel  ).assign(scope, val.brand_id);
                        }
                        else{
                            $parse(attrs['ngModel'] + '_id').assign(scope, val.brand_id);
                        }

                        if (val.series_id) {
                            this.loadSeries(val.brand_id, function () {
                                _this.setTypes(_this.getTypes(val.series_id));
                                var arr = val.value.split('_');
                                _this.setSeries({
                                    series_id: val.series_id,
                                    value: arr[1]
                                })
                                $parse(attrs['ngModel']).assign(scope, arr[0]);
                                scope.$apply();
                            }, false);
                        }
                        else {
                            this.loadSeries(val.brand_id);
                            $parse(attrs['ngModel']).assign(scope, val.value);
                            element.val(val.value)
                            scope.$apply();
                        }
                        return this;
                    },
                    setSeries: function (val) {
                        var $elem = $('[ng-model="'+ attrs['autoCompleteBrand'] +'"]');
                        if (typeof val == 'object') {
                            if( $elem.data('id-model') ){
                                $parse( $elem.data('id-model')).assign(scope, val.series_id);
                            }
                            else{
                                $parse(attrs['autoCompleteBrand'] + '_id').assign(scope, val.series_id);
                            }

                            $parse(attrs['autoCompleteBrand']).assign(scope, val.value);
                        }
                        else {
                            if( $elem.data('id-model') ){
                                $parse( $elem.data('id-model') ).assign(scope, val);
                            }
                            else{
                                $parse(attrs['autoCompleteBrand'] + '_id').assign(scope, val);
                            }


                            $parse(attrs['autoCompleteBrand']).assign(scope, val);
                        }
                        return this;
                    },
                    loadSeries: function (id, callback, isShow) {
                        var _this = this;
                        setTimeout(function () {
                            _this.$target = $('[ng-model="' + attrs['autoCompleteBrand'] + '"]').attr('brand_id', id);
                            _this.setSeries('');
                            _this.$targetVehicle = _this.$target.nextAll('.vehicle-outer').find('.vehicle-inner');
                            $http.get(MBS_DOMAIN + '/Basicservice/Cache/getSeriesListByBrandId/?brand_id=' + id).success(function (res) {
                                var $list = _this.$targetVehicle.find('.list ul');
                                if (res.code == 0) {
                                    var html = '';
                                    for (var i = 0; i < res.data.length; i++) {
                                        var item = res.data[i];
                                        html += '<li><a data-value="' + item.id + '" href="javascript:;" data-types=' + item.types.join(',') + '>' + item.name + '</a></li>';
                                    }
                                }
                                $list.html(html);
                                if (isShow == true || isShow == null)
                                    _this.$targetVehicle.show();
                                callback && callback();
                            })
                        }, 100);
                        return this;
                    },
                    show: function () {
                        if( !element.prop('readonly') )
                            this.getVehicle().show();
                        $('.ac_results').hide();
                        return this;
                    },
                    hide: function () {
                        this.getVehicle().hide();
                        return this;
                    },
                    getVehicle: function () {
                        return this.$elem.nextAll('.vehicle-outer').find('.vehicle-inner');
                    },
                    getTypes: function (id) {
                        var $node = this.$target.nextAll('.vehicle-outer').find('[data-value="' + id + '"]');
                        return $node.data('types').toString().split(',') || [];
                    },
                    setTypes: function (types) {
                        if (!this.$target) return this;
                        var series = this.$target.attr('auto-complete-series');
                        if (typeof types == 'object') {
                            $parse(series).assign(scope, types[0] || '');
                        }
                        else {
                            $parse(series).assign(scope, types);
                        }
                        return this;
                    },
                    init: function () {
                        var _this = this;
                        this.$elem = $(element).autocomplete(this.url, this.opt).on('result', function (e, val) {
                            _this.value(val).hide();
                            scope.autoCompleteName = val.value;
                        }).on('click', function () {
                            var $vehicle = _this.getVehicle();
                            var $list = $vehicle.find('.list ul');
                            _this.show();
                            if (!$list.children().length)
                                $http.get(MBS_DOMAIN + "/Basicservice/Cache/getBrandListOrderBySpell").success(function (res) {
                                    if (res.code == 0) {
                                        var html = '', letter = "";
                                        for (var i = 0; i < res.data.length; i++) {
                                            var item = res.data[i];
                                            if (letter == item.first_spell) {

                                            }
                                            else {
                                                letter = item.first_spell;
                                                html += '<li><a id="' + letter + '" href="javascript:;" class="letter">' + letter + '</a></li>';
                                            }
                                            html += '<li><a data-value="' + item.id + '" href="javascript:;">' + item.name + '</a></li>';
                                        }
                                    }
                                    $list.html(html)
                                })
                        }).on('keyup', function () {
                            _this.hide()
                        })

                        this.$vehiclPanel = this.$elem.nextAll('.vehicle-outer').on('click', '.list a', function () {
                            _this.value({brand_id: $(this).data('value'), value: $(this).text()}).hide();
                            scope.$apply();
                        })

                        _this.$vehiclPanel.find('.close').on('click', function () {
                            _this.hide();
                        });

                        /* scope.$watch( attrs['ngModel'] , function( val ){
                         if( _this.isInited )
                         _this.setTypes('').setSeries('');
                         })*/
                        this.isInited = true;
                        return this;
                    },
                    bindAnchors: function () {
                        var _this = this;
                        var letterHeight = 25;
                        var scrollTopLetter = function (scrollTop) {
                            var res;
                            _this.$vehiclPanel.find('.list .letter').each(function () {
                                if ($(this).offset().top <= scrollTop && $(this).offset().top >= scrollTop - letterHeight) {
                                    res = $(this).text();
                                    return false;
                                }
                            })
                            return res;
                        }

                        var letterOffsetTop = function (letter) {
                            var scrollTop = _this.$vehiclPanel.find('.list').scrollTop();
                            return $('#' + letter).offset().top + scrollTop - _this.$vehiclPanel.find('.vechicle-nav').offset().top;
                        }
                        _this.$vehiclPanel.find('.list').on('scroll', function () {
                            var $nav = _this.$vehiclPanel.find('.vechicle-nav');
                            var r = scrollTopLetter($nav.offset().top);
                            $nav.text(r);
                        })
                        _this.$vehiclPanel.find('.anchors').on('click', 'a', function () {
                            var top = letterOffsetTop($(this).text());
                            _this.$vehiclPanel.find('.list').scrollTop(top);
                        })
                        return this;
                    }
                }

                Brand.init().bindAnchors();

                /*   scope.brandKeypress = function(){
                 $parse(attrs['ngModel'] + '_id').assign(scope,null);
                 return this;
                 }*/
            }
        }
    }])

    /**
     * 车系自动下拉
     * <input auto-complete-series="type" ng-model="series"></input>
     * attrs.idModel 用于存放 id 的 ng-model
     * */
    .directive('autoCompleteSeries', ['$http', 'MBS_DOMAIN', '$parse', function ($http, MBS_DOMAIN, $parse) {
        return {
            restrict: 'AE',
            require: '?ngModel',
            scope : {
                source : '=source'
            },
            link: function (scope, element, attrs, ngModel) {
                var Series = {
                    init: function () {
                        var _this = this;
                        var defaults = {
                            extraParams: {
                                brand_id: function () {
                                    return $parse('item.vehicle_brand_id')(scope.$parent);
                                }
                            },
                            scroll: true,
                            scrollHeight: 300,
                            dataType: "json",
                            matchSubset: false,
                            //  highlightItem: false,
                            cache: false,
                            parse: function (res) {
                                return $.map(res.data, function (row) {
                                    return {
                                        data: row
                                    }
                                });
                            },
                            formatItem: function (row, n, m) {
                                return '<a href="javascript:;" data-value="' + row.brand_id + '" data-series-value="' + row.series_id + '">' + row.value + '</a>';
                            }
                        }
                        $.browser = $.browser || {};
                        var opt = angular.extend(defaults, attrs.setting);
                        var url = MBS_DOMAIN + "/Basicservice/VehicleSearch/getSeries";
                        element.autocomplete(url, opt).on('result', function (e, val) {
                            _this.value(val)
                                .setTypes(val.types);
                            scope.$parent.autoCompleteName = val.value;
                            scope.$parent.$apply();
                            _this.hide();
                        })

                        element.nextAll('.vehicle-outer').on('click', 'a', function () {

                            //   $elem.val( $(this).text() );
                            //   $elem.siblings(':hidden').val( $(this).attr('data-value') );

                            if ($(this).hasClass('close')) {
                                _this.hide();
                                return;
                            }
                            var id = $(this).data('value');

                            var types = $(this).attr('data-types').split(',');
                            _this.value({value: $(this).text(), series_id: id})
                                .setTypes(types);
                            _this.hide();

                            setTimeout(function () {
                                _this.$target = $('[ng-model="item.vehicle_model_id"]');

                                _this.setModel('');
                                _this.$targetVehicle = _this.$target.nextAll('.vehicle-outer').find('.vehicle-inner');
                                $http.get(MBS_DOMAIN + '/Basicservice/Cache/getModelListBySeriesId?series_id=' + id).success(function (res) {

                                    var $list = _this.$targetVehicle.find('.list ul');
                                    if (res.code == 0) {
                                        var newRes = {};
                                        if( !res.data.length ){
                                            $parse('item.hasVehicheModeList').assign( scope.$parent , false);
                                        }
                                        else{
                                            $parse('item.hasVehicheModeList').assign( scope.$parent , true);
                                        }


                                        for (var i = 0; i < res.data.length; i++) {
                                            var item = res.data[i];
                                            if( !newRes['-' + item.model_year] )
                                                newRes['-' + item.model_year] = [];
                                            newRes['-' + item.model_year].push (item);
                                        }

                                        $parse('item.vehicle_model_list').assign( scope.$parent , newRes);


                                        var html = '';
                                        for(var key in newRes){
                                            if(key != '-'){
                                                var ye = key.split('-')[1];
                                                html += '<li data-year="'+ ye +'"><a href="javascript:;" ><span class="text-danger">' + ye + '款</span></a></li>';
                                            }
                                            for (var j = 0; j < newRes[key].length; j++) {
                                                var item2 = newRes[key][j];
                                                html += '<li><a data-value="' + item2.id + '" data-year="' + item2.model_year + '" href="javascript:;" >' + item2.sale_name + '</a></li>';
                                            }
                                        }
                                    }
                                    $list.html(html);
                                    //if (isShow == true || isShow == null)
                                    _this.$targetVehicle.show();

                                  //  callback && callback();
                                })
                            }, 100);
                            scope.$parent.$apply();

                        })

                        element.on('click', function () {
                            _this.show();
                        }).on('keyup', function () {
                            _this.hide()
                        })
                    },
                    setModel: function (val) {
                        var modelName = 'item.vehicle_model';
                        var $elem = $('[ng-model="'+ modelName +'"]');
                        if (typeof val == 'object') {
                            if( $elem.data('id-model') ){
                                $parse( $elem.data('id-model')).assign( scope.$parent , val.series_id);
                            }
                            else{
                                $parse( modelName + '_id').assign( scope.$parent  , val.series_id);
                            }

                            $parse( modelName ).assign( scope.$parent  , val.value);
                        }
                        else {
                            if( $elem.data('id-model') ){
                                $parse( $elem.data('id-model') ).assign( scope.$parent , val);
                            }
                            else{
                                $parse( modelName + '_id').assign( scope.$parent , val);
                            }

                            $parse( modelName ).assign( scope.$parent , val);
                        }
                        return this;
                    },
                    getVehicle: function () {
                        return element.nextAll('.vehicle-outer').find('.vehicle-inner');
                    },
                    hide: function () {
                        this.getVehicle().hide();
                        return this;
                    },
                    show: function () {
                        $('.ac_results').hide();
                        if( !element.prop('readonly') )
                            this.getVehicle().show();
                        return this;
                    },
                    value: function (val) {

                        if( attrs.idModel ){
                            $parse( attrs.idModel ).assign(scope.$parent, val.series_id );
                        }
                        else{
                            $parse(attrs['ngModel'] + '_id').assign(scope.$parent, val.series_id);
                        }
                        $parse(attrs['ngModel']).assign(scope.$parent, val.value);
                        return this;
                    },
                    setTypes: function (types) {
                        $parse(attrs['autoCompleteSeries']).assign(scope.$parent, types[0]);
                        $parse(attrs['autoCompleteSeries'] + '_types').assign(scope.$parent, types);
                        return this;
                    }
                }

                Series.init();
            }
        }
    }])

/**
 * 车系自动下拉
 * <input auto-complete-series="type" ng-model="series"></input>
 * attrs.idModel 用于存放 id 的 ng-model
 * */
    .directive('autoCompleteModel', ['$http', 'MBS_DOMAIN', '$parse', function ($http, MBS_DOMAIN, $parse) {
        return {
            restrict: 'AE',
            require: '?ngModel',
            link: function (scope, element, attrs, ngModel) {
                var Model = {
                    init: function () {
                        var _this = this;
                        var defaults = {
                            extraParams: {
                                series_id: function () {
                                    return $parse('item.vehicle_series_id')(scope);
                                }
                            },
                            scroll: true,
                            scrollHeight: 300,
                            dataType: "json",
                            matchSubset: false,
                            //  highlightItem: false,
                            cache: false,
                            parse: function (res) {
                                return $.map(res.data, function (row) {
                                    return {
                                        data: row
                                    }
                                });
                            },
                            formatItem: function (row, n, m) {
                                return '<a href="javascript:;" data-value="' + row.brand_id + '" data-series-value="' + row.series_id + '">' + row.value + '</a>';
                            }
                        }
                        $.browser = $.browser || {};
                        var opt = angular.extend(defaults, attrs.setting);
                        var url = MBS_DOMAIN + "/Basicservice/VehicleSearch/getSeries";
                     /*   element.autocomplete(url, opt).on('result', function (e, val) {
                            _this.value(val)
                                .setTypes(val.types);
                            scope.autoCompleteName = val.value;
                            scope.$apply();
                            _this.hide();
                        })*/

                        element.nextAll('.vehicle-outer').on('click', 'a', function () {
                            if($(this).parent().data('year')){
                                return ;
                            }
                            //    loadSeries( $(this).data('value') );
                            //   $elem.val( $(this).text() );
                            //   $elem.siblings(':hidden').val( $(this).attr('data-value') );
                            if ($(this).hasClass('close')) {
                                _this.hide();
                                return;
                            }
                            var modelYear = '';
                            if($(this).data('year')){
                                modelYear = $(this).data('year') + '款 ';
                            }
                           // var types = $(this).attr('data-types').split(',');
                            _this.value({value: modelYear + $(this).text(), series_id: $(this).data('value')})
                             //   .setTypes(types);
                            _this.hide();
                            scope.$apply();
                        })

                        element.on('click', function () {
                            _this.show();
                        }).on('keyup', function () {
                            _this.hide()
                        })
                    },
                    getVehicle: function () {
                        return element.nextAll('.vehicle-outer').find('.vehicle-inner');
                    },
                    hide: function () {
                        this.getVehicle().hide();
                        return this;
                    },
                    show: function () {
                        $('.ac_results').hide();
                        if( !element.prop('readonly') )
                            this.getVehicle().show();
                        return this;
                    },
                    value: function (val) {
                        if( attrs.idModel ){
                            $parse( attrs.idModel ).assign(scope, val.series_id );
                        }
                        else{
                            $parse(attrs['ngModel'] + '_id').assign(scope, val.series_id);
                        }
                        $parse(attrs['ngModel']).assign(scope, val.value);
                        return this;
                    },
                    setTypes: function (types) {
                        $parse(attrs['autoCompleteSeries']).assign(scope, types[0]);
                        $parse(attrs['autoCompleteSeries'] + '_types').assign(scope, types);
                        return this;
                    }
                }

                Model.init();
            }
        }
    }])
    /**
     * 上传控件
     * <web-uploader ng-model="uploadfiles"></web-uploader>
     * attrs.addButton #button
     * attrs.dnd  #dndArea
     * attrs.paste #uploader
     * attrs.server 上传地址 , default : 'http://upload.273.com.cn/'
     * attrs.label 上传按钮文字
     * attrs.quality 图片质量, default : 90
     * attrs.fileNumLimit 上传文件个数限制, default : 300
     * attrs.fileSizeLimit 上传文件限制, default : 4M
     * attrs.accept 上传按钮文字, default : {title: 'Images',extensions: 'gif,jpg,jpeg,bmp,png', mimeTypes: 'image/*' }
     *
     * */
    .directive('webUploader', ['$http', 'MBS_DOMAIN', '$parse','$timeout', function ($http, MBS_DOMAIN, $parse , $timeout) {
        return {
            restrict: 'AE',
            require: '?ngModel',
            replace: true,
            transclude: true,
            template :  ' <div class="uploader">\
                    <div  class=" file-picker"></div>\
                    <div class="queueList"><ul  class="uploader-list filelist"></ul></div>\
                    <span ng-transclude></span>\
                </div>',
            link: function (scope, element, attrs, ngModel) {

                var $wrap = element, $coverImage,

                // 图片容器
                    $queue = $( '.filelist' , element ),

                // 状态栏，包括进度和控制按钮
                    $statusBar = $wrap.find( '.statusBar' ),

                // 文件总体选择信息。
                    $info = $statusBar.find( '.info' ),

                // 上传按钮
                    $upload = $wrap.find( '.uploadBtn' ),

                // 没选择文件之前的内容。
                    $placeHolder = $wrap.find( '.placeholder' ),

                    $progress = $statusBar.find( '.progress' ).hide(),

                // 添加的文件数量
                    fileCount = 0,

                // 添加的文件总大小
                    fileSize = 0,

                // 优化retina, 在retina下这个值是2
                    ratio = window.devicePixelRatio || 1,

                // 缩略图大小
                    thumbnailWidth = 110 * ratio,
                    thumbnailHeight = 110 * ratio,

                // 可能有pedding, ready, uploading, confirm, done.
                    state = 'pedding',

                // 所有文件的进度信息，key为file id
                    percentages = {},
                // 判断浏览器是否支持图片的base64
                    isSupportBase64 = ( function() {
                        var data = new Image();
                        var support = true;
                        data.onload = data.onerror = function() {
                            if( this.width != 1 || this.height != 1 ) {
                                support = false;
                            }
                        }
                        data.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
                        return support;
                    } )(),

                // 检测是否已经安装flash，检测flash的版本
                    flashVersion = ( function() {
                        var version;

                        try {
                            version = navigator.plugins[ 'Shockwave Flash' ];
                            version = version.description;
                        } catch ( ex ) {
                            try {
                                version = new ActiveXObject('ShockwaveFlash.ShockwaveFlash')
                                    .GetVariable('$version');
                            } catch ( ex2 ) {
                                version = '0.0';
                            }
                        }
                        version = version.match( /\d+/g );
                        return parseFloat( version[ 0 ] + '.' + version[ 1 ], 10 );
                    } )(),

                    supportTransition = (function(){
                        var s = document.createElement('p').style,
                            r = 'transition' in s ||
                                'WebkitTransition' in s ||
                                'MozTransition' in s ||
                                'msTransition' in s ||
                                'OTransition' in s;
                        s = null;
                        return r;
                    })(),

                // WebUploader实例
                    uploader;

                if ( !WebUploader.Uploader.support('flash') && WebUploader.browser.ie ) {

                    // flash 安装了但是版本过低。
                    if (flashVersion) {
                        (function(container) {
                            window['expressinstallcallback'] = function( state ) {
                                switch(state) {
                                    case 'Download.Cancelled':
                                        alert('您取消了更新！')
                                        break;

                                    case 'Download.Failed':
                                        alert('安装失败')
                                        break;

                                    default:
                                        alert('安装已成功，请刷新！');
                                        break;
                                }
                                delete window['expressinstallcallback'];
                            };

                            var swf = './expressInstall.swf';
                            // insert flash object
                            var html = '<object type="application/' +
                                'x-shockwave-flash" data="' +  swf + '" ';

                            if (WebUploader.browser.ie) {
                                html += 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ';
                            }

                            html += 'width="100%" height="100%" style="outline:0">'  +
                                '<param name="movie" value="' + swf + '" />' +
                                '<param name="wmode" value="transparent" />' +
                                '<param name="allowscriptaccess" value="always" />' +
                                '</object>';

                            container.html(html);

                        })($wrap);

                        // 压根就没有安转。
                    } else {
                        $wrap.html('<a href="http://www.adobe.com/go/getflashplayer" target="_blank" border="0"><img alt="get flash player" src="http://www.adobe.com/macromedia/style_guide/images/160x41_Get_Flash_Player.jpg" /></a>');
                    }

                    return;
                } else if (!WebUploader.Uploader.support()) {
                    alert( 'Web Uploader 不支持您的浏览器！');
                    return;
                }

                if (attrs.accept == 'fileUpload'){
                    $title_name = '点击选择文件';
                } else {
                    $title_name = '点击选择图片';
                }

                // 实例化
                uploader = WebUploader.create({
                    auto: true,
                    pick: {
                        id: element.find('.file-picker'),
                        label: attrs.label ||  $title_name,
                        multiple : false
                    },
                    formData: {
                        uid: 123,
                        thumbHeight: 200,
                        thumbWidth: 200,
                        category: 'change'
                    },
                    dnd:  element.find('.placeholder') ,// '#dndArea',
                    paste: attrs.id ,//'#uploader',
                    swf: '../../dist/Uploader.swf',
                    chunked: false,
                    chunkSize: 512 * 1024,
                    server: attrs.server || 'http://upload.273.com.cn/' ,//'../../server/fileupload.php',
                    // runtimeOrder: 'flash',

                    accept: attrs.accept || {
                        title: 'Images',
                        extensions: 'gif,jpg,jpeg,bmp,png',
                        mimeTypes: 'image/*'
                    },
                    compress : {
                        width: 1600,
                        height: 1600,

                        // 图片质量，只有type为`image/jpeg`的时候才有效。
                        quality: attrs.quality || 90,

                        // 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
                        allowMagnify: false,

                        // 是否允许裁剪。
                        crop: false,

                        // 是否保留头部meta信息。
                        preserveHeaders: true,

                        // 如果发现压缩后文件大小比原来还大，则使用原来图片
                        // 此属性可能会影响图片自动纠正功能
                        noCompressIfLarger: false,

                        // 单位字节，如果图片大小小于此值，不会采用压缩。
                        compressSize: 0
                    },
                    // 禁掉全局的拖拽功能。这样不会出现图片拖进页面的时候，把图片打开。
                    disableGlobalDnd: true,
                    fileNumLimit:  attrs.fileNumLimit || 300 ,
                    fileSizeLimit: attrs.fileSizeLimit || 4 * 1024 * 1024,    // 200 M
                    fileSingleSizeLimit:  attrs.fileSingleSizeLimit || 4 * 1024 * 1024    // 50 M
                });

                // 拖拽时不接受 js, txt 文件。
                uploader.on( 'dndAccept', function( items ) {
                    var denied = false,
                        len = items.length,
                        i = 0,
                    // 修改js类型
                        unAllowed = 'text/plain;application/javascript ';

                    for ( ; i < len; i++ ) {
                        // 如果在列表里面
                        if ( ~unAllowed.indexOf( items[ i ].type ) ) {
                            denied = true;
                            break;
                        }
                    }

                    return !denied;
                });

                uploader.on('dialogOpen', function() {
                    //   console.log('here');
                });

                // uploader.on('filesQueued', function() {
                //     uploader.sort(function( a, b ) {
                //         if ( a.name < b.name )
                //           return -1;
                //         if ( a.name > b.name )
                //           return 1;
                //         return 0;
                //     });
                // });

                // 添加“添加文件”的按钮，
                /*           uploader.addButton({
                 id: '.uploader-start',//  '#filePicker2',
                 label: '继续添加'
                 });*/

                /*   uploader.on('ready', function() {
                 window.uploader = uploader;
                 });*/


                // 当有文件添加进来时执行，负责view的创建
                function addFile( file ) {
                    var $li = $( '<li id="' + file.id + '">' +
                            '<p class="title">' + (file.name || '') + '</p>' +
                            '<p class="imgWrap"></p>'+
                            '<p class="progress"><span></span></p>' +
                            '</li>' ),

                        $btns = $('<div class="file-panel">' +
                            '<span class="cancel">删除</span>' +
                            '<span class="rotateRight">向右旋转</span>' +
                            '<span class="rotateLeft">向左旋转</span></div>').appendTo( $li ),
                        $prgress = $li.find('p.progress span'),
                        $wrap = $li.find( 'p.imgWrap' ),
                        $info = $('<p class="error"></p>'),

                        showError = function( code ) {
                            switch( code ) {
                                case 'exceed_size':
                                    text = '文件大小超出';
                                    break;

                                case 'interrupt':
                                    text = '上传暂停';
                                    break;

                                default:
                                    text = '上传失败，请重试';
                                    break;
                            }

                            $info.text( text ).appendTo( $li );
                        };




                    if( file.url ){
                        var img = $('<img src="'+ file.url +'">');
                        $wrap.empty().append( img );
                        /*       $('.queueList .placeholder ' , element ).addClass('element-invisible')
                         $('.statusBar ' , element ).show();*/
                        file.rotation = 0;
                    }
                    else if ( file.getStatus && file.getStatus() === 'invalid' ) {
                        showError( file.statusText );
                    } else {
                        // @todo lazyload
                        $wrap.text( '预览中' );
                        uploader.makeThumb( file, function( error, src ) {
                            var img;

                            if ( error ) {
                                $wrap.text( '不能预览' );
                                return;
                            }

                            if( isSupportBase64 ) {
                                img = $('<img src="'+src+'">');
                                $wrap.empty().append( img );
                            } else {
                                /*$.ajax('../../server/preview.php', {
                                 method: 'POST',
                                 data: src,
                                 dataType:'json'
                                 }).done(function( response ) {
                                 if (response.result) {
                                 img = $('<img src="'+response.result+'">');
                                 $wrap.empty().append( img );
                                 } else {
                                 $wrap.text("预览出错");
                                 }
                                 });*/
                                img = $('<img src="'+ file.url +'">');
                                $wrap.empty().append( img );
                            }
                        }, thumbnailWidth, thumbnailHeight );

                        percentages[ file.id ] = [ file.size, 0 ];
                        file.rotation = 0;
                    }


                    !file.url && file.on('statuschange', function( cur, prev ) {
                        if ( prev === 'progress' ) {
                            $prgress.hide().width(0);
                        } else if ( prev === 'queued' ) {
                            // $li.off( 'mouseenter mouseleave' );
                            //$btns.remove();
                        }

                        // 成功
                        if ( cur === 'error' || cur === 'invalid' ) {
                            showError( file.statusText );
                            percentages[ file.id ][ 1 ] = 1;
                        } else if ( cur === 'interrupt' ) {
                            showError( 'interrupt' );
                        } else if ( cur === 'queued' ) {
                            $info.remove();
                            $prgress.css('display', 'block');
                            percentages[ file.id ][ 1 ] = 0;
                        } else if ( cur === 'progress' ) {
                            $info.remove();
                            $prgress.css('display', 'block');
                        } else if ( cur === 'complete' ) {
                            $prgress.hide().width(0);
                            $li.append( '<span class="success"></span>' );
                        }

                        $li.removeClass( 'state-' + prev ).addClass( 'state-' + cur );
                    });

                    $li.on( 'mouseenter', function() {
                        $btns.stop().animate({height: 30});
                    });

                    $li.on( 'mouseleave', function() {
                        $btns.stop().animate({height: 0});
                    }).on( 'click', '.coverImage' , function() {
                        var index = $(this).closest('li').index();
                        var value = $parse( attrs.ngModel )( scope );
                        value.unshift( value.splice( index ) );
                        $parse( attrs.ngModel ).assign( scope , value);
                        $(this).closest('li').prependTo( $queue )
                        $(this).hide().closest('li').siblings().find('.coverImage').stop(true,true).fadeIn();

                    });

                    $btns.on( 'click', 'span', function() {
                        var index = $(this).index(),
                            deg;

                        switch ( index ) {
                            case 0:
                                //  uploader.removeFile( file );
                                var $li = $(this).closest('li');
                                var index = $li.index();
                                var model = $parse( attrs.ngModel )( scope );
                                model.splice( index , 1 );
                                $parse( attrs.ngModel ).assign( scope , model );

                                var modelArray =  $parse( attrs.ngModel + 'Array')( scope), arr ;
                                arr = modelArray.split(',');
                                arr.splice( index , 1);
                                $parse( attrs.ngModel + 'Array' ).assign( scope ,arr.join(',') );

                                $li.off().find('.file-panel').off().end().remove();
                                if(  $queue.find('li').length < attrs.fileNumLimit ){
                                    element.find('label').show()
                                }
                                uploader.removeFile( file );

                                return;

                            case 1:
                                file.rotation += 90;
                                break;

                            case 2:
                                file.rotation -= 90;
                                break;
                        }

                        if ( supportTransition ) {
                            deg = 'rotate(' + file.rotation + 'deg)';
                            $wrap.css({
                                '-webkit-transform': deg,
                                '-mos-transform': deg,
                                '-o-transform': deg,
                                'transform': deg
                            });
                        } else {
                            $wrap.css( 'filter', 'progid:DXImageTransform.Microsoft.BasicImage(rotation='+ (~~((file.rotation/90)%4 + 4)%4) +')');
                            // use jquery animate to rotation
                            // $({
                            //     rotation: rotation
                            // }).animate({
                            //     rotation: file.rotation
                            // }, {
                            //     easing: 'linear',
                            //     step: function( now ) {
                            //         now = now * Math.PI / 180;

                            //         var cos = Math.cos( now ),
                            //             sin = Math.sin( now );

                            //         $wrap.css( 'filter', "progid:DXImageTransform.Microsoft.Matrix(M11=" + cos + ",M12=" + (-sin) + ",M21=" + sin + ",M22=" + cos + ",SizingMethod='auto expand')");
                            //     }
                            // });
                        }


                    });

                    $li.appendTo( $queue );

                    $coverImage = $('<span class="coverImage">设置封面</span>').appendTo( $li );

                    setCoverImage( $coverImage , $li.index() );

                    if(  $queue.find('li').length >= attrs.fileNumLimit ){
                        element.find('label').hide()
                    }
                }

                function setCoverImage ( $coverImage  , index ){
                    if( attrs.coverImage == 'true' && index != 0){
                        $coverImage.show();
                    }
                    else{
                        $coverImage.hide();
                    }
                }

                // 负责view的销毁
                function removeFile( file ) {
                    var $li = $('#'+file.id);

                    delete percentages[ file.id ];
                    updateTotalProgress();
                    $parse( attrs.ngModel ).assign( scope , $parse( attrs.ngModel )( scope).splice( $li.index() , 1 ) );

                    var arr = $parse( attrs.ngModel + 'Array').split(',');
                    $parse( attrs.ngModel + 'Array' ).assign( scope , arr.splice( $li.index() , 1).join(',') );
                    $li.off().find('.file-panel').off().end().remove();

                    if(  $queue.find('li').length < attrs.fileNumLimit ){
                        element.find('label').show()
                    }
                }

                function updateTotalProgress() {
                    var loaded = 0,
                        total = 0,
                        spans = $progress.children(),
                        percent;

                    $.each( percentages, function( k, v ) {
                        total += v[ 0 ];
                        loaded += v[ 0 ] * v[ 1 ];
                    } );

                    percent = total ? loaded / total : 0;


                    spans.eq( 0 ).text( Math.round( percent * 100 ) + '%' );
                    spans.eq( 1 ).css( 'width', Math.round( percent * 100 ) + '%' );
                    updateStatus();
                }

                function updateStatus() {
                    var text = '', stats;

                    if ( state === 'ready' ) {
                        text = '选中' + fileCount + '张图片，共' +
                            WebUploader.formatSize( fileSize ) + '。';
                    } else if ( state === 'confirm' ) {
                        stats = uploader.getStats();
                        if ( stats.uploadFailNum ) {
                            text = '已成功上传' + stats.successNum+ '张照片至XX相册，'+
                                stats.uploadFailNum + '张照片上传失败，<a class="retry" href="#">重新上传</a>失败图片或<a class="ignore" href="#">忽略</a>'
                        }

                    } else {
                        stats = uploader.getStats();
                        text = '共' + fileCount + '张（' +
                            WebUploader.formatSize( fileSize )  +
                            '），已上传' + stats.successNum + '张';

                        if ( stats.uploadFailNum ) {
                            text += '，失败' + stats.uploadFailNum + '张';
                        }
                    }

                    $info.html( text );
                }

                function setState( val ) {
                    var file, stats;

                    if ( val === state ) {
                        return;
                    }

                    $upload.removeClass( 'state-' + state );
                    $upload.addClass( 'state-' + val );
                    state = val;

                    switch ( state ) {
                        case 'pedding':
                            $placeHolder.removeClass( 'element-invisible' );
                            $queue.hide();
                            $statusBar.addClass( 'element-invisible' );
                            uploader.refresh();
                            break;

                        case 'ready':
                            $placeHolder.addClass( 'element-invisible' );
                            element.find( '.uploader-start' ).removeClass( 'element-invisible');
                            $queue.show();
                            $statusBar.removeClass('element-invisible');
                            uploader.refresh();
                            break;

                        case 'uploading':
                            element.find( '.uploader-start' ).addClass( 'element-invisible' );
                            $progress.show();
                            $upload.text( '暂停上传' );
                            break;

                        case 'paused':
                            $progress.show();
                            $upload.text( '继续上传' );
                            break;

                        case 'confirm':
                            $progress.hide();
                            element.find( '.uploader-start' ).removeClass( 'element-invisible' );
                            $upload.text( '开始上传' );

                            stats = uploader.getStats();
                            if ( stats.successNum && !stats.uploadFailNum ) {
                                setState( 'finish' );
                                return;
                            }
                            break;
                        case 'finish':
                            stats = uploader.getStats();
                            if ( stats.successNum ) {
                                // alert( '上传成功' );
                            } else {
                                // 没有成功的图片，重设
                                state = 'done';
                                location.reload();
                            }
                            break;
                    }

                    updateStatus();
                }

                uploader.onUploadProgress = function( file, percentage ) {
                    var $li = $('#'+file.id),
                        $percent = $li.find('.progress span');

                    $percent.css( 'width', percentage * 100 + '%' );
                    percentages[ file.id ][ 1 ] = percentage;
                    updateTotalProgress();
                };

                uploader.onFileQueued = function( file ) {
                    fileCount++;
                    fileSize += file.size;

                    if ( fileCount === 1 ) {
                        $placeHolder.addClass( 'element-invisible' );
                        $statusBar.show();
                    }

                    addFile( file );
                    setState( 'ready' );
                    updateTotalProgress();
                };

                uploader.onFileDequeued = function( file ) {
                    fileCount--;
                    fileSize -= file.size;

                    if ( !fileCount ) {
                        setState( 'pedding' );
                    }

                    removeFile( file );
                    updateTotalProgress();

                };

                uploader.on( 'all', function( type ) {
                    var stats;
                    switch( type ) {
                        case 'uploadFinished':
                            setState( 'confirm' );
                            break;

                        case 'startUpload':
                            setState( 'uploading' );
                            break;

                        case 'stopUpload':
                            setState( 'paused' );
                            break;

                    }
                });

                // 文件上传成功，给item添加成功class, 用样式标记上传成功。
                uploader.on( 'uploadSuccess', function( file ,args ) {
                    var arr =   $parse( attrs.ngModel )( scope  ) || [];
                    var arrs =   $parse(  attrs.ngModel + 'Array' )( scope ) ;
                    arrs = arrs ? arrs.split(',') : [];
                    args.isupload = true;
                    arr.push( args )
                    arrs.push( args.file_path )
                    $parse( attrs.ngModel ).assign( scope , arr );
                    $parse( attrs.ngModel + 'Array' ).assign( scope , arrs.join(',') );
                    scope.$apply();
                });
                uploader.onError = function( code ) {
                    alert( 'Eroor: ' + code );
                };

                $upload.on('click', function() {
                    if ( $(this).hasClass( 'disabled' ) ) {
                        return false;
                    }

                    if ( state === 'ready' ) {
                        uploader.upload();
                    } else if ( state === 'paused' ) {
                        uploader.upload();
                    } else if ( state === 'uploading' ) {
                        uploader.stop();
                    }
                });

                $info.on( 'click', '.retry', function() {
                    uploader.retry();
                } );

           /*     $info.on( 'click', '.ignore', function() {
                    alert( 'todo' );
                } );*/

                $upload.addClass( 'state-' + state );

                updateTotalProgress();
                var isfirstload = true;
                scope.$watch( attrs.ngModel , function( val ,oldValue ){

                    if( val ){
                        if(!isfirstload)
                            $queue.find('li').remove();

                        var files = val || [], arr = [] ;
                        // [{"error":0,"file_path":"eqsdfs01\/M06\/C7\/52\/CgDJBFaXZoiEfOayAAAAAHJ5KoI047.jpg","url":"http:\/\/img.273.com.cn\/eqsdfs01\/M06\/C7\/52\/CgDJBFaXZoiEfOayAAAAAHJ5KoI047_200-200c_9_1_0.jpg","org_url":"http:\/\/img.273.com.cn\/eqsdfs01\/M06\/C7\/52\/CgDJBFaXZoiEfOayAAAAAHJ5KoI047_0-0_9_0_0.jpg?token=8d0e21b747ce4fff597dedd5fdb1a480 &time=1452762760","text":""}];
                        for( var i = 0 ; i < files.length ; i ++ ){
                            if( !files[i].isupload )
                                addFile( files[i] );
                            arr.push( files[i].file_path);
                        }
                        $parse( attrs.ngModel + 'Array' ).assign( scope , arr.join(',') );
                        isfirstload = false ;
                    }
                })
            }
        }
    }])
