/**
 * @desc 车付宝收入支出余额
 * @author wuzg@273.cn
 */
angular.module('chefubao.DeptIncomeExpense.deptList', ["chefubao.DeptIncomeExpense.deptList.service"])
    .controller('controller.chefubao.DeptIncomeExpense.deptList',
    ["$scope", "$rootScope", "$stateParams", "$modal", "$state", "$filter", "$cookieStore","$timeout", "deptList", "utils",
        function ($scope, $rootScope, $stateParams, $modal, $state, $filter, $cookieStore , $timeout , deptList, utils ) {
            $scope.deptList = deptList ;
            $scope.utils = utils;
        }])
