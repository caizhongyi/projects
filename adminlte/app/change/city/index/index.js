/**
 * Created by zhengby on 2015/07/13.
 */
var appUser = angular.module('change.city.index', ['change.city.index.service', 'change.city.index.filter', 'utils.service' ]);

appUser.controller('controller.change.city.index',function($scope, $rootScope, citys, $stateParams, $state, $modal, $log , utils, area , $state ){


    var currentPage =  $stateParams.currentPage || 1;
    var pageSize =  10;
    //area.province( ).success(function( res ){
        //console.log( res.data);
    //})
    // 用来条件筛选
    $scope.search = $stateParams;

    //console.log($scope.search);
    $scope.itemsPerPage = pageSize;

    function getInfo() {
        citys.get( currentPage, pageSize , $stateParams).success(function( res ) {
            if (res.code == 0) {
                $scope.list = res.data.cityList;
                $scope.totalItems = res.data.total;
                $scope.currentPage = currentPage;
            } else {
                utils.message(res.msg);
            }
        });
    }

    $scope.pageChanged = function(){
        $state.go($state.current.name , getParams($stateParams));
    };

    getInfo();

    $scope.edit = function(index){
        $scope.list[index].birthday_b = $scope.list[index].birthday * 1000;
        $scope.open( null , $scope.list[index] , 'tpl-update.html');
    }

    $scope.add = function(){
        $scope.open( null , {} , 'tpl-add.html');
    }

    $scope.open = function ( size , item , template) {
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

        modalInstance.result.then(function () {
            //   $scope.selected = selectedItem;
        }, function () {

        });
    };



    // 获取请求列表请求参数
    function getParams(params) {
        return angular.extend({}, params, { currentPage: $scope.currentPage});
    }
    // 筛选条件
    $scope.searchAction = function() {

        //console.log($scope);
        if (!$scope.search) {
            $scope.search = {};
        }
        // 解决缓存问题 临时解决搜索无效问题
        if ($scope.currentPage) {
            $scope.currentPage = 0;
        } else {
            $scope.currentPage = 1;
        }
        //console.log($scope.search);
        $state.go($state.current.name,  getParams($scope.search));
    }

});
appUser.directive("direct",function($http , MBS_DOMAIN){
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
appUser.directive("direct",function($http , MBS_DOMAIN){
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
appUser.directive("zby",function($http , MBS_DOMAIN){
    return {
        restrict: 'ECMA',
        replace: true,
        template:
        '<div id="liandong">' +
        '省份<select id="province" name="pro" class="" ng-model="item.province" ng-disabled="disabled" ng-readonly="true" ng-selected="flase">' +
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
appUser.directive('removeItem', function($timeout, citys) {

    return {
        restrict : 'A',
        link : function(scope, element, attr) {
            element.click(function() {
                if (confirm("确定删除？")) {
                    citys.remove( scope.item.city_id ).success(function( res ){
                        if( res.code == 0){
                            element.closest('tr').remove();
                        }
                        else{
                            utils.message( res.msg );
                        }
                    }).error(function(){
                        utils.message('删除失败！');
                    })
                }
            })
        }
    }
});

appUser.controller('controller.modal.instance', function ($scope, $modalInstance, $state, citys, item) {
    $scope.item = item;

    $scope.submitted = false;
    $scope.interacted = function( field ){
        return  field.$dirty || $scope.submitted || field.isblur;
    }

    $scope.checkPhoneAvalibale = function( field ){
        var errors = [];
        for (var name in field.$error) {
            errors.push(name);
        }
        return (errors.length == 1);
    }
    $scope.create = function (isValid) {
        $scope.submitted = true;
        if (isValid) {
            citys.add( $scope.item ).success(function( res ){
                if( res.code == 0 ){
                    $modalInstance.dismiss('cancel');
                    //$scope.currentPage = 0;
                   // $state.go($state.current.name , { currentPage : 0});
                    $state.reload();//刷新当前页面
                }else{
                    utils.message( res.msg );
                }
            });
        }
    };

    $scope.update = function(form) {
        $scope.submitted = true;
            citys.update(  $scope.item ).success(function( res ){

                if( res.code == 0 ){
                    $modalInstance.dismiss('cancel');
                }
                else {
                    utils.message( res.msg );
                }
            })
    }



    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };




});



