/**
 * Created by DTO on 2015/4/27.
 * ?
 */
angular.module('settlement.apply.refundOrder', [
    'settlement.apply.refundOrder.service',
    'utils.service'
])
    .controller('controller.settlement.apply.refundOrder',
    ["$scope", "$rootScope", "$stateParams", "$modal", "$state",  "settlement" ,
        function ($scope, $rootScope, $stateParams, $modal, $state,  settlement ) {


            $scope.refund = function(){
                if (confirm("是否要退款？")){

                }
            }

       /*     $scope.edit = function () {
                $scope.addModal(null, this.item);
            }*/


            $scope.messageModal = function(){

            }

        }])

