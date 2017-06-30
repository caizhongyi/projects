/**
 * Created by Huph on 2015/7/15.
 * ?
 */
angular.module('settlement.trade.index', [
    'settlement.trade.index.service',
    "settlement.utils.service", "settlement.utils.directive"
])
.controller('controller.settlement.trade.index',
["$scope", "$rootScope", "$stateParams", "$modal", "$state",  "trade" ,
    function ($scope, $rootScope, $stateParams, $modal, $state,  trade ) {
        $scope.trade = trade ;
        $scope.addOne = function(){
            $state.go('settlement-trade-edit');
        }

        $scope.edit = function(){
            $state.go('settlement-trade-edit',{ id : this.item.id });
        }
        $scope.searchUnFinished = function(){
            trade.unfinishedTrade().success(function( res ){
                if( res.code == 0){
                    $scope.tradeResoult = true;
                    $scope.unfinishedTrade = res.data;
                }
                else{
                    angular.message( data.msg );
                }
            })
        }
    }])


