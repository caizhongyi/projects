var appUser = angular.module('log.mongo.index', ['log.mongo.index.service']);

appUser.controller(
    'controller.log.mongo.index', [ "$scope", "$rootScope", "$stateParams", "$state" , "utils", "mongo"  , function($scope, $rootScope, $stateParams, $state , utils, mongo ){

    var currentPage =  $stateParams.currentPage || 1;
    var pageSize =  20;

    // 每页显示条数
    $scope.itemsPerPage = pageSize;

    // 用来条件筛选
    $scope.searchCondition = $stateParams;

    $scope.searchCondition.start_time = new Date(0, 0, 0);
    $scope.searchCondition.end_time = new Date(0, 0, 0);

    function getLogInfo() {

        var search = $scope.searchCondition;
        var item =  {
            //db : search.db_input ? search.db_input : search.db_select,
            //collection : search.collection_input ? search.collection_input : search.collection_select,
            identity : search.identity,
            offset : currentPage,
            start_date :  search.start_date ? search.start_date + ' ' + formatTime(search.start_time) : '',
            end_date :  search.end_date ? search.end_date + ' ' + formatTime(search.end_time)  : ''
        };

        //console.log(formatTime(search.start_time));
        //console.log(formatTime(search.end_time));

        mongo.getLogs(item).success(function( res ) {
            if (res.code == 0) {
                $scope.list = res.data.list;

                $scope.totalItems = res.data.total;
                $scope.currentPage = currentPage;

                if (!res.data.total) {
                    utils.message("本次查询结果为空！");
                }
            } else {
                utils.message(res.msg);
            }
        });
    }

    function formatTime(date) {
        return date.getHours() + ':' + date.getMinutes() + ':00';
    }

     // 搜索框搜索
    $scope.searchInfo = function() {
        currentPage = 1;
        getLogInfo();
    };
    // 分页切换搜索
    $scope.pageChanged = function() {
        currentPage = $scope.currentPage;
        getLogInfo();
    };
}]);

