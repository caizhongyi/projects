angular.module('settlement.reportDept.reportDeptAccount', [
    'settlement.reportDept.reportDeptAccount.service',
    "settlement.utils.service", "settlement.utils.directive"
])
.controller('controller.settlement.reportDept.reportDeptAccount',
["$scope", "$rootScope", "$stateParams", "$modal", "$state", "utils", "reportDept" ,
    function ($scope, $rootScope, $stateParams, $modal, $state, utils, reportDept ) {

        $scope.reportDept = reportDept ;
		
		$scope.utils = utils;

        }])


