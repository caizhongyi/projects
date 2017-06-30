angular.module('settlement.contract.step3', [
    'settlement.contract.step3.service',
    'settlement.utils.service'
])
    .controller('controller.settlement.contract.step3',
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

