/**
 * Created by zhengby on 2015/07/13
 * ?
 */
angular.module('change.user.index', ['change.user.index.service', 'change.user.index.filter', 'utils.service'])
    .controller('controller.change.user.index',function( $scope, $rootScope, $stateParams, $modal ,$log ,users , $state, area , utils  ){


        //$scope.searchData = {} ;
        var currentPage =  $stateParams.currentPage || 1;
        var pageSize =  10 ;


        // 用来条件筛选
        $scope.search = $stateParams;
        //console.log($scope.search);

        $scope.itemsPerPage = pageSize;

        function getInfo(){
            users.get( currentPage ,  pageSize  , $stateParams ).success(function( res ){
                //console.log( res.data.userlist);
                if (res.code == 0) {
                    $scope.list = res.data.userlist;
                    $scope.totalItems = res.data.total;
                    $scope.currentPage = currentPage;
                } else {
                    utils.message(res.msg);
                }
            })
        }
        $scope.pageChanged = function(){
            $state.go($state.current.name , getParams($stateParams));
        };

        getInfo();
        //查询条件起
        $scope.gisteTypeList = [
            {type:1, name: "个人"},
            {type:2, name: "办证人员"},
            {type:3, name: "二手车商"},

        ];

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
        //条件条件止

        $scope.edit = function(){
            //console.log( this.item);
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

    .controller('controller.modal.instance', function ($scope, $modalInstance ,item , users , $state , utils ) {
        $scope.item = item;

        $scope.update = function (isValid) {
            if (isValid) {
                users.update(  $scope.item ).success(function( res ){
                    if( res.code == 0 ){
                        $modalInstance.dismiss('cancel');
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