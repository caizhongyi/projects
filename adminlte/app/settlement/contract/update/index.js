angular.module('settlement.contract.update', [
    'settlement.contract.update.service',
    'utils.service'
])
    .controller('controller.settlement.contract.update',
    ["$scope", "$rootScope", "$stateParams", "$modal", "$state",  "settlement" ,
        function ($scope, $rootScope, $stateParams, $modal, $state,  settlement ) {

                $scope.item = {
                    buyer_agent_name : 'a'
                }

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

