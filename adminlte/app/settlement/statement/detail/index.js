/**
 * Created by DTO on 2015/4/27.
 * ?
 */
angular.module('settlement.statement.detail', [
    'settlement.statement.detail.service',
    'utils.service'
])
    .controller('controller.settlement.statement.detail',
    ["$scope", "$rootScope", "$stateParams", "$modal", "$state",  "statementDetailList" ,
        function ($scope, $rootScope, $stateParams, $modal, $state,  statementDetailList ) {

            $scope.statementDetailList = statementDetailList ;


        }])

