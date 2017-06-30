/**
 * Created by Zhengby on 2015/07/14.
 */
var appUser = angular.module('change.product.index', ['change.product.index.service', 'change.product.index.filter']);


appUser.config(function($provide){
    $provide.value('userStatus', function() {
        return [
            {type:0, name: "未知"},
            {type:1, name: "正常"},
            {type:2, name: "离职"},
            {type:4, name: "休长假"},
            {type:9, name: "暂停"},
            {type:10, name: "黑名单"},
            {type:101, name: "驳回"},
        ];
    });

});/*
var l = {a: '1', b: '2'};
angular.forEach(l, function(v, k){console.log(k + ': ' + v)});*/
appUser.controller('controller.change.product.index',function($scope, $rootScope, products, $stateParams, $state, $modal, userStatus , utils,$filter,area  ){

    var currentPage =  $stateParams.currentPage || 1;
    var pageSize =  10;

    // 用来条件筛选
    $scope.search = $stateParams;
    $scope.itemsPerPage = pageSize;
    //console.log($scope);

    function getInfo() {
        products.get( currentPage, pageSize , $stateParams).success(function( res ) {
            if (res.code == 0) {
                $scope.list = res.data.productList;
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

    $scope.userStatusList = userStatus();

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
});

appUser.directive('removeItem', function($timeout, products , utils ) {
    return {
        restrict : 'A',
        link : function(scope, element, attr) {
            element.click(function() {
                if (confirm("确定删除？")) {
                    products.remove( scope.item.product_id ).success(function( res ){
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

appUser.controller('controller.modal.instance', function ($scope, $modalInstance, $state, products, item, userStatus , utils ) {
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

    $scope.userStatusList = userStatus();

    $scope.create = function (isValid) {
        $scope.submitted = true;
        if (isValid) {
            formartTime($scope.item.birthday);
            products.add( $scope.item ).success(function( res ){
                if( res.code == 0 ){
                    $modalInstance.dismiss('cancel');
                    $state.go($state.current.name , { currentPage : 0});
                }
                else{
                    utils.message( res.msg );
                }
            });
        }
    };

    $scope.update = function(form) {

        var names = [];
        for (var name in form.$error) {
            names.push(name);
        }
        // 暂时解决日期验证不通过， 后期改进
        if (names.length == 1 && names[0] == 'date' ) {
            isValid = true;
        } else {
            isValid = form.$valid;
        }

        $scope.submitted = true;
        if (isValid) {
            formartTime($scope.item.birthday_b);
            products.update(  $scope.item ).success(function( res ){
                if( res.code == 0 ){
                    $modalInstance.dismiss('cancel');
                }
                else {
                    utils.message( res.msg );
                }
            }).error(function(){
                utils.message('请求失败!');
            })
        } else {
            utils.message('验证失败， 禁止更新！');
        }
    }

    function formartTime($time) {
        var tmp = new Date($time);
        $scope.item.birthday = tmp.getTime() / 1000;
    }

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    // angular指令日期插件代码
    $scope.clear = function () {
        $scope.item.birthday = null;
    };
    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.startopened = true;
    };
    $scope.maxDate = new Date();

//    $scope.disabled = function(date, mode) {
//        console.log(date.getDate());
////        return ( mode === 'day' && ( date.getDate() ) );
//    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };
    $scope.format = 'yyyy-MM-dd';
});
