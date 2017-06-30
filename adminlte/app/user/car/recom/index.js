/**
 * Created by DTO on 2015/4/27.
 */
var appUser = angular.module('user.car.recom', ['user.car.recom.service', 'user.car.recom.filter']);


appUser.controller('controller.user.car.recom', ["$scope", "$rootScope", "recoms", "$stateParams", "$state", "$modal", "$log" , "utils" , "$filter",function($scope, $rootScope, recoms, $stateParams, $state, $modal, $log , utils , $filter){
    var currentPage = 1;

    if ($stateParams.currentPage != 0) {
        currentPage =  $stateParams.currentPage;
    }

    var pageSize = 20

    // 分页指令 每页显示数目与
    $scope.itemsPerPage = pageSize;

     // 转换成可读时间格式
    if ($stateParams.max_create) {
        var tmp = new Date($stateParams.max_create);
        $stateParams.max_create = $filter('date')(tmp.getTime(), 'yyyy-MM-dd');
    }
    if ($stateParams.min_create) {
        var tmp = new Date($stateParams.min_create);
        $stateParams.min_create = $filter('date')(tmp.getTime(), 'yyyy-MM-dd');
    }
    
    // 用来条件筛选
    $scope.search = $stateParams;
    
    function getInfo() {
        recoms.get( currentPage, pageSize, $stateParams).success(function( res ) {
            $scope.list = res.data.list;
            $scope.totalItems = res.data.total;
            $scope.currentPage  =  currentPage;
        });
    }
    getInfo();

    // 获取请求列表请求参数
    function getParams(params) {        
        return angular.extend({}, params, {currentPage: $scope.currentPage});
    }   

    $scope.districts = [{id:'1', name:'福州'}];

    $scope.recomcar = function(index) {
        if (this.recom.is_recom == 0) {
            recoms.setRecom(this.recom.id).success(function( res ){
                if (res.code == 0) {
                    $state.go($state.current.name, getParams($stateParams),  { 
                      reload: true, inherit: false, notify: true
                    });
                }
            });
        } else {
            recoms.cancelRecom(this.recom.id).success(function( res ){
                if (res.code == 0) {
                    $state.go($state.current.name, getParams($stateParams),  {
                        reload: true, inherit: false, notify: true
                    });
                }
            });
        }
    }

    $scope.pageChanged = function() {
        $state.go($state.current.name , getParams($stateParams));
    };

    $scope.searchAction = function() {
        if (!$scope.search) {
            $scope.search = {};
        }
        console.log($scope.search);
        $scope.search.city_id = 1;
        if ($scope.currentPage) {
             $scope.currentPage = 0; 
         } else {
            $scope.currentPage = 1; 
         } 
       
        $state.go($state.current.name ,  getParams($scope.search));
    }

    // angular指令插件代码   
    $scope.clear = function () {
        $scope.search.min_create = null;
        $scope.search.max_create = null;
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

//    $scope.maxDate = new Date();

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };
    $scope.format = 'yyyy-MM-dd';

}]);

