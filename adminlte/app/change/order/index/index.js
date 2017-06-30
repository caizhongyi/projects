/**
 * Created by Zhengby on 2015/7/14.
 * ?
 */
angular.module('change.order.index', ['change.order.index.service', 'change.order.index.filter', 'utils.service'])
    .controller('controller.change.order.index',function( $scope, $rootScope, $stateParams, $modal ,$log ,orders , $state, area,$filter  , utils ){


        //$scope.searchData = {} ;
        var currentPage =  $stateParams.currentPage || 1;
        var pageSize =  10 ;

        // 转换成可读时间格式
        if ($stateParams.max_create) {
            var tmp = new Date($stateParams.max_create);
            $stateParams.max_create = $filter('date')(tmp.getTime(), 'yyyy-MM-dd');
        }
        if ($stateParams.min_create) {
            var tmp = new Date($stateParams.min_create);
            $stateParams.min_create = $filter('date')(tmp.getTime(), 'yyyy-MM-dd');
        }
        // 转换成可读时间格式
        if ($stateParams.max_pay) {
            var tmp = new Date($stateParams.max_pay);
            $stateParams.max_pay = $filter('date')(tmp.getTime(), 'yyyy-MM-dd');
        }
        if ($stateParams.min_pay) {
            var tmp = new Date($stateParams.min_pay);
            $stateParams.min_pay = $filter('date')(tmp.getTime(), 'yyyy-MM-dd');
        }

        // 用来条件筛选
        $scope.search = $stateParams;
        //console.log($scope.search);

        $scope.itemsPerPage = pageSize;

        function getInfo(){
            orders.get( currentPage ,  pageSize  , $stateParams ).success(function( res ){
                 //console.log(res.data);

                $scope.userList =res.data.userList;
                if( res.code == 0 ){
                    $scope.list = res.data.orderList;
                    $scope.list = res.data.orderList;
                    $scope.totalItems = res.data.total;
                    $scope.currentPage = currentPage;
                }else {
                    utils.message( res.msg );
                }

            })
        }
        $scope.pageChanged = function(){
            $state.go($state.current.name , getParams($stateParams));
        };

        getInfo();
        //查询条件起
        $scope.orderstatusList = [
            {status:0, name: "未付款"},
            {status:1, name: "己付款"},
            {status:2, name: "办理中"},
            {status:3, name: "已完成"},
            {status:4, name: "退款中"},
            {status:5, name: "已退款"},

        ];

      //  console.log($scope.orderstatusList);
        // 获取请求列表请求参数
        function getParams(params) {
            //console.log(params);
            return angular.extend({}, params, { currentPage: $scope.currentPage});
        }
        // 筛选条件
        $scope.searchAction = function() {
            if (!$scope.search) {
                $scope.search = {};
            }
            // 解决缓存问题 临时解决搜索无效问题
            if ($scope.currentPage) {
                $scope.currentPage = 0;
            } else {
                $scope.currentPage = 1;
            }
            
            $state.go($state.current.name,  getParams($scope.search));
        }
        //日期起
        // angular指令插件代码
        $scope.clear = function () {
            $scope.search.min_create = null;
            $scope.search.max_create = null;
            $scope.search.min_pay = null;
            $scope.search.max_pay = null;
        };
        $scope.startopen = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.startopened = true;
        };
        $scope.endopen = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.endopend = true;
        };
        $scope.startopenb = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.startopenedb = true;
        };
        $scope.endopenb = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.endopendb = true;
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };
        $scope.format = 'yyyy-MM-dd';
        //条件条件止
        //条件条件止

        $scope.edit = function(){
            $scope.open( null , this.item , 'tpl-edit.html');
        }
        $scope.update = function(){
            $scope.open( null , this.item , 'tpl-update.html');
        }

        $scope.open = function (size , item, template) {
            var modalInstance = $modal.open({
                templateUrl: template,
                controller: 'controller.modal.instance',
                size: size,
                resolve: {
                    item: function () {
                        return item;
                    }
                }
            });

            //弹出结果
            modalInstance.result.then(function () {
            }, function () {

            });
        };
    })
    .directive("direct",function($http , MBS_DOMAIN){
        return {
            restrict: 'ECMA',
            replace: true,
            template:
            '<div id="liandong">' +
            '省份<select id="province" name="pro" class="" ng-model="item.province">' +
            '<option ng-repeat="province in provinces" ng-selected="item.province == province.id" value="{{province.id}}">{{province.name}}</option>' +
            '</select>'+
            '城市<select id="update-xxx" name="sex" class="city" ng-model="item.city">' +
            '<option ng-repeat="city in citys"  ng-selected="item.city == city.id" value="{{city.id}}">{{city.name}}</option>'+
            '</select></div>',
            cope:{
                provincecity:'='
            },
            link: function(scope, elem, attrs) {
                $http.get(MBS_DOMAIN + '/User/Common/getProvinceList/token/1').success(function(result) {
                    if (result.code == 0) {
                        scope.provinces = result.data;
                    }
                });

                scope.$watch('item.province', function(id,oldValue, scope){
                    if (id) {
                        $http.get(MBS_DOMAIN + '/User/Common/getCityListByProvinceId/token/1/id/' + id).success(function(result) {
                            if (result.code == 0) {
                                scope.citys = result.data;
                            }
                        });
                    }
                })
            }
        }
    })

    .controller('controller.modal.instance', function ($scope, $modalInstance ,item , orders , $state , utils ) {
        $scope.item = item;

        $scope.update = function (isValid) {
            if (isValid) {
                orders.update(  $scope.item ).success(function( res ){
                    if( res.code == 0 ){
                        $state.reload();//刷新当前页面
                        $modalInstance.dismiss('cancel');
                        $state.reload();//刷新当前页面

                    }
                    else {
                        utils.message( res.msg );
                    }

                }).error(function(){
                    utils.message('请求失败!');
                })
            }
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });