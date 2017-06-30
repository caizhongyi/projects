/**
 * Created by DTO on 2015/4/27.
 * ?
 */
angular.module('settlement.card.index', [
    'settlement.card.index.service',
    'settlement.utils.service'
])
    .controller('controller.settlement.card.index',
    ["$scope", "$rootScope", "$stateParams", "$modal", "$state",  "settlement" ,
        function ($scope, $rootScope, $stateParams, $modal, $state,  settlement ) {

            $scope.refund = function(){
                if (confirm("是否要退款？")){

                }
            }

            $scope.edit = function () {
                $scope.addModal(null, this.item);
            }
            $scope.add = function(){
                tableControl.update( $scope , 'settlement' );
            }

            $scope.remove = function(){

            }

            $scope.messageModal = function(){

            }

        }])

