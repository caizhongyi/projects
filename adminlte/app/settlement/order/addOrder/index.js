/**
 * Created by DTO on 2015/4/27.
 * ?
 */
angular.module('settlement.order.addOrder', [
    'settlement.order.addOrder.service',
    'utils.service'
])
    .controller('controller.settlement.order.addOrder',
    ["$scope", "$rootScope", "$stateParams", "$modal", "$state",  "settlementAdd" ,"utils",
        function ($scope, $rootScope, $stateParams, $modal, $state,  settlementAdd , utils ) {

            $scope.utils = utils;
            var modals = {
                openSuccess : function( data ){
                    $modal.open({
                        templateUrl: "tpl-success.html" ,
                        resolve: {
                            item: function () {
                                return $scope.item;
                            },
                            $state :  function () {
                                return $state;
                            }
                        },
                        size:  'md',
                        controller:   [  "$scope", "$rootScope", "$modalInstance", "item", "$state",  function(
                            $scope, $rootScope, $modalInstance, item, $state
                        ){
                            $scope.item = data.data;
                            $scope.ok = function(){
                                $modalInstance.dismiss('cancel');
                            }
                            $scope.cancel = function(){
                                $modalInstance.dismiss('cancel');
                            }
                            $scope.cancelAndGo = function(){
                                $modalInstance.dismiss('cancel');
                                $state.go('settlement-order-orderList');
                            }
                            $scope.goToUpdate = function(){
                                $modalInstance.dismiss('cancel');
                                $state.go('settlement-order-editOrder' , { order_no :  $scope.item.order_no } );
                            }
                        }]
                    });
                },
                openMessage : function( data ){
                    $modal.open({
                        templateUrl: "tpl-message.html" ,
                        resolve: {
                            item: function () {
                                return $scope.item;
                            },
                            $state :  function () {
                                return $state;
                            }
                        },
                        size:  'md',
                        controller:   [  "$scope", "$rootScope", "$modalInstance", "item", "$state", "utils", function(
                            $scope, $rootScope, $modalInstance, item, $state , utils
                        ){

                            $scope.item = data.data;
                            $scope.goToUpdate = function(){
                                $modalInstance.dismiss('cancel');
                                $state.go('settlement-order-editOrder' , { order_no :  $scope.item.order_no } );
                            }

                            $scope.submitMessageForm = function(isValid){

                                if(isValid){
                                    item.repeat_order = true;
                                    item.repeat_add_reason = $scope.item.repeat_add_reason;
                                    settlementAdd.add( item ).success(function( res ){
                                        modals.openSuccess( res )
                                        $modalInstance.dismiss('cancel');
                                    })
                                }
                            }

                            $scope.goToList = function(){
                                $modalInstance.dismiss('cancel');
                                $state.go('settlement-order-orderList' , { car_number :  $scope.item.car_number } );
                            }

                            $scope.cancel = function(){
                                $modalInstance.dismiss('cancel');
                            }
                        }]
                    });
                }
            }

            $scope.submit = function( isValid ){
                if( isValid ){
                    settlementAdd.add( $scope.item ).success(function ( res ) {
                        if (res.code == 0) {
                            modals.openSuccess( res )
                        }
                        else if( res.code == 2 ){
                            modals.openMessage( res );
                        }
                        else {
                            utils.message( res.msg || res.message ) ;
                        }
                    }).error(function () {
                        utils.message('添加失败！');
                    })
                }
            }

        }])

