angular.module('settlement.contract.step2', [
    'settlement.contract.step2.service',
    'utils.service'
])
    .controller('controller.settlement.contract.step2',
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

