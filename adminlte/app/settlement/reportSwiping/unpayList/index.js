/**
 * Created by Huph on 2015/7/15.
 * ?
 */
angular.module('settlement.reportSwiping.unpayList', [
    'settlement.reportSwiping.unpayList.service',
    "settlement.utils.service", "settlement.utils.directive"
])
.controller('controller.settlement.reportSwiping.unpayList',
["$scope", "$rootScope", "$stateParams", "$modal", "$state",  "unpayList" ,
    function ($scope, $rootScope, $stateParams, $modal, $state,  unpayList ) {
        $scope.unpayList = unpayList ;
        $scope.showExcel = function(){
            unpayList.excel($scope.searchCondition);
        }
    }])


