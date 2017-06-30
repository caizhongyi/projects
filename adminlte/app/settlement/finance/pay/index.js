/**
 * Created by DTO on 2015/4/27.
 * ?
 */
angular.module('settlement.finance.pay', [
    'settlement.finance.pay.service'
])
    .controller('controller.settlement.finance.pay',
    ["$scope", "$rootScope", "$stateParams", "$modal", "$state", "settlement.finance.pay.service.financePay" ,
        function ($scope, $rootScope, $stateParams, $modal, $state, financePay ) {
            $scope.payLists = [];
            $scope.payCount = 0;
            $scope.paySum = 0;
            $scope.pay = [];
            $scope.pay.ids = $stateParams.ids;
            $scope.pay.payBank = '';
            $scope.pay.payValidCode = '';
            $scope.lockPay = false;
            financePay.get($stateParams).success(function(ret){
                if (ret.code != 0) {
                    alert(ret.msg);
                    return;
                }
                for (var i = 0; i < ret.data.list.length; i++) {
                    $scope.payCount++;
                    $scope.paySum += ret.data.list[i].fee;
                }
                $scope.payLists = ret.data.list;
            });
            $scope.payment = function() {
                if ($scope.lockPay) return;
                $scope.lockPay = true;
                if (!$scope.pay.payBank) {
                    $scope.lockPay = false;
                    alert('请选择付款行');
                    return;
                }
                if (!$scope.pay.payValidCode) {
                    $scope.lockPay = false;
                    alert('请输入验证码');
                    return;
                }
                financePay.pay($scope.pay).success(function(ret){
                    $scope.lockPay = false;
                    if (ret.code != 0) {
                        alert(ret.msg);
                        return;
                    }
                    $state.go('settlement-finance-index');
                });
            }
        }]);

