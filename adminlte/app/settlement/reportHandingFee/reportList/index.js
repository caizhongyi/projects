/**
 * Created by DTO on 2015/4/27.
 * ?
 */
angular.module('settlement.reportHandingFee.reportList', [
    'settlement.reportHandingFee.reportList.service',
    'settlement.utils.service', 'settlement.utils.directive', 'settlement.utils.filter'
])
.controller('controller.settlement.reportHandingFee.reportList',
["$scope", "$rootScope", "$stateParams", "$modal", "$state",  "reportHandingFee", "utils",
    function ($scope, $rootScope, $stateParams, $modal, $state,  reportHandingFee, utils) {

        $scope.reportHandingFee = reportHandingFee ;
        $scope.utils = utils;
        $scope.confirm = function(){
            var item = this.item;
            $modal.open({
                templateUrl: "tpl-confirm.html" ,
                resolve: {
                    item: function () {
                        return item;
                    }
                },
                size:  'sm',
                controller:   [  "$scope", "$rootScope", "$modalInstance", "item", "$state", "$filter", "reportHandingFee" ,
                function($scope, $rootScope, $modalInstance, item, $state ,$filter, reportHandingFee ){

                    $scope.ok = function(){
                        reportHandingFee.updateStatus(item).success(function(res){
                            if(res.code == 0){
                                $state.reload();
                                $modalInstance.dismiss('cancel');
                            }
                            else if(res.code == 1){
                                alert(res.msg);
                            }
                        })
                    }
                    $scope.cancel = function(){
                        $modalInstance.dismiss('cancel');
                    }
                }]
            });
        }
    }])


