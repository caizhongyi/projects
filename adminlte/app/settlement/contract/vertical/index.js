angular.module('settlement.contract.vertical', [
    'settlement.contract.vertical.service',
    'utils.service'
])
    .controller('controller.settlement.contract.vertical',
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

