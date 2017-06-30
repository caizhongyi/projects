/**
 * Created by DTO on 2015/4/27.
 */
var appUser = angular.module('user.car.index', ['user.car.index.service', 'user.car.index.filter']);


appUser.controller('controller.user.car.index',[ "$scope", "$rootScope", "users", "$stateParams", "$state", "$modal", "$log" , "utils"  ,function($scope, $rootScope, users, $stateParams, $state, $modal, $log , utils ){

    var currentPage =  $stateParams.currentPage || 1;
    var pageSize =  10;
    var isChange = false;

    function getInfo() {

        users.get( currentPage, pageSize ).success(function( res ) {
            $scope.list = res.data.list;
            $scope.totalItems = res.data.total;
            $scope.currentPage  =  currentPage;
        });
    }

    $scope.pageChanged = function(){
        if( isChange )  $scope.currentPage = 0 ;
        $state.go($state.current.name , { currentPage : $scope.currentPage});
        isChange = false ;
    };

    getInfo();

}]);

