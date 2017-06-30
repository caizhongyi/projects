/**
 * Created by Huph on 2015/7/15.
 * ?
 */
angular.module('settlement.reportSwiping.advancePay', [
    'settlement.reportSwiping.advancePay.service',
    "settlement.utils.service", "settlement.utils.directive"
])
.controller('controller.settlement.reportSwiping.advancePay',
["$scope", "$rootScope", "$stateParams", "$modal", "$state",  "advancePay" ,
    function ($scope, $rootScope, $stateParams, $modal, $state,  advancePay ) {
        $scope.advancePay = advancePay ;
        $scope.showExcel = function(){
            advancePay.excel($scope.searchCondition);
        }
        }])


