angular.module('out.wechat.statistics', [
    'out.wechat.statistics.service',
    'ui.router'
])
    .controller('controller.out.wechat.statistics',
    ["$scope", "$rootScope", "$stateParams", "$modal", "$log", "count", "$state", "utils", "modules", "PAGINATION",
        function ($scope, $rootScope, $stateParams, $modal, $log, count, $state, utils, modules, PAGINATION) {
            $scope.searchData = {};
            $scope.transferDetail = count;
            $scope.maxSize = PAGINATION.maxSize;
            var currentPage = $stateParams.currentPage || PAGINATION.currentPage;
            var pageSize = PAGINATION.pageSize;
            var starTime = $stateParams.starTime || '';
            var endTime = $stateParams.endTime || '';
            var isChange = false;
            $scope.searchData = $stateParams;
            function getInfo() {
                count.get(currentPage, pageSize, $scope.searchData).success(function (res) {
                    $scope.list = res.body.list;
                    $scope.totalItems = res.body.total;
                    //$rootScope.rootCurrentPage =
                    $scope.currentPage = currentPage;
                    $scope.searchData.starTime = starTime;
                    $scope.searchData.endTime = endTime;
                    $(window).resize();
                    /* $scope.emit('pageChanged', {
                     currentPage : currentPage,
                     searchData :  $scope.searchData
                     });*/
                })
            }


            $scope.searchChange = function () {
                isChange = true;
            }

            function go() {

                if (isChange)  $scope.currentPage = 0;
                $scope.searchData.currentPage = $scope.currentPage
                $state.go($state.current.name, $scope.searchData, {reload: true});
                isChange = false;
            }

            $scope.searchInfo = $scope.pageChanged = function () {
                go();
            };

            getInfo();
        }])