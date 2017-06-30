/**
 * Created by DTO on 2015/4/27.
 * ?
 */
angular.module('settlement.order.orderList', [
    'settlement.order.orderList.service',
    "settlement.utils.service", "settlement.utils.directive"
])
    .controller('controller.settlement.order.orderList',
    ["$scope", "$rootScope", "$stateParams", "$modal", "$state",  "settlement" , "utils", "$timeout", "security", "$location", "$cookieStore",
        function ($scope, $rootScope, $stateParams, $modal, $state,  settlement , utils , timeout , security , $location , $cookieStore) {

            //模型对象
            $scope.settlement = settlement;
            $scope.utils = utils;
            $scope.userInfo = $cookieStore.get("user");

            var modals = {
                openSuccess : function( scope , data ){
                    $modal.open({
                        templateUrl: "tpl-success.html" ,
                        resolve: {
                            item: function () {
                                return $scope.item;
                            }
                        },
                        size:  'sd',
                        controller:   [  "$scope", "$rootScope", "$modalInstance", "item", "$state",  function(
                            $scope, $rootScope, $modalInstance, item, $state
                        ){
                            $scope.item = data.data;
                            $scope.ok = function(){
                                scope.item = data.data;
                                scope.update();
                                $modalInstance.dismiss('cancel');
                                $state.reload();
                            }
                            $scope.cancel = function(){
                                $modalInstance.dismiss('cancel');
                                $state.reload();
                            }
                        }]
                    });
                },
                openMessage : function( scope ,data ,instance ){
                    $modal.open({
                        templateUrl: "tpl-message.html" ,
                        resolve: {
                            item: function () {
                                return $scope.item;
                            }
                        },
                        size:  'md',
                        controller:   [  "$scope", "$rootScope", "$modalInstance", "item", "$state",  function(
                            $scope, $rootScope, $modalInstance, item, $state
                        ){
                            $scope.update = function(){
                                $modalInstance.dismiss('cancel');
                            }

                            $scope.ok = function(){
                                var d =  data.data;
                                d.repeat_order = true;
                                settlement.add( d ).success(function( res ){
                                    $modalInstance.dismiss('cancel');
                                    instance.dismiss('cancel');
                                    modals.openSuccess( scope , res )
                                })
                            }

                            $scope.goToList = function(){
                                $modalInstance.dismiss('cancel');
                                $state.go('settlement-order-orderList' , { car_number :  $scope.item.car_number } );
                            }

                            $scope.cancel = function(){
                                $modalInstance.dismiss('cancel');
                                instance.dismiss('cancel');
                            }
                        }]
                    });
                }
            }

            $scope.edit = function(){
                var type = this.item.order_contract.status ? 1 : 0 ;
                $state.go('settlement-order-editOrder', { order_no : this.item.order_no , type : type } );
            }

            $scope.$on('modalAddWarning' , function( e, $scope ,data , $modalInstance){
                modals.openMessage( $scope,data , $modalInstance )
            });

            $scope.$on('modalAddSuccess' , function( e, $scope ,data ){
                modals.openSuccess( $scope ,data )
            });

            $scope.refund = function(){
                $state.go("settlement-apply-refundApply" , { order_no : this.item.order_no })
            }


            $scope.complete = function(){
                $state.go('settlement-contract-addContract',{ order_no : this.item.order_no });
            }

            $scope.contractInfo = function(){
                $state.go('settlement-contract-getContractByOrderNo',{ order_no : this.item.order_no });
            }

            $scope.finish = function(){
                var item = this.item;
                settlement.finishOrder(item).success(function(res){
                    $modal.open({
                        templateUrl: "tpl-finish.html" ,
                        resolve: {
                            res: function () {
                                return res;
                            }
                        },
                        size:  'md',
                        controller:   [  "$scope", "$rootScope", "$modalInstance", "res", "$state",  function(
                            $scope, $rootScope, $modalInstance, res, $state
                        ){
                            $scope.res = res;
                            $scope.cancel = function(){
                                $modalInstance.dismiss('cancel');
                                $state.reload();
                            }
                        }]
                    });
                });
            }
            $scope.apply = function(){
                var item = this.item;
                settlement.applyFlatformFee(item).success(function(res){
                    $modal.open({
                        templateUrl: "tpl-apply.html" ,
                        resolve: {
                            res: function () {
                                return res;
                            }
                        },
                        size:  'md',
                        controller:   [  "$scope", "$rootScope", "$modalInstance", "res", "$state",  function(
                            $scope, $rootScope, $modalInstance, res, $state
                        ){
                            $scope.res = res;
                            $scope.cancel = function(){
                                $modalInstance.dismiss('cancel');
                                $state.reload();
                            }
                        }]
                    });
                });
            }
            $scope.unfreeze = function(){
                var item = this.item;
                settlement.unfreeze(item).success(function(res){
                    $modal.open({
                        templateUrl: "tpl-unfreeze.html" ,
                        resolve: {
                            res: function () {
                                return res;
                            }
                        },
                        size:  'md',
                        controller:   [  "$scope", "$rootScope", "$modalInstance", "res", "$state",  function(
                            $scope, $rootScope, $modalInstance, res, $state
                        ){
                            $scope.res = res;
                            $scope.cancel = function(){
                                $modalInstance.dismiss('cancel');
                                $state.reload();
                            }
                        }]
                    });
                });
            }
            $scope.noticeTransfer = function(){
                var item = this.item;
                $modal.open({
                    templateUrl: "tpl-notice-transfer.html" ,
                    resolve: {
                        item: function () {
                            return item;
                        }
                    },
                    size:  'md',
                    controller:   [  "$scope", "$rootScope", "$modalInstance", "item", "$state", "$filter",function(
                        $scope, $rootScope, $modalInstance, item, $state ,$filter
                    ){
                        $scope.cancel = function(){
                            $modalInstance.dismiss('cancel');
                        }

                        $scope.item = item;
                        $scope.submitter = $scope.submitter || {};
                        $scope.submitter.status = item.car_number;
                        $scope.submitter.order_no = $scope.item.order_no;

                        $scope.submitted = false;
                        $scope.interacted = function( field ){
                            $scope.interacted = function( field ){
                                return  (utils.browser().msie ? (field.$dirty && $scope.submitted) : (field.$dirty || $scope.submitted)) || field.isblur;
                            }
                        }

                        $scope.ok = function(isValid){

                            $scope.submitted = true;
                            if( isValid ){
                                settlement.noticeTransfer( $scope.submitter ).success(function( res ){
                                    if (res.code == 0) {
                                        $modalInstance.dismiss('cancel');
                                        utils.message(res.msg || '发送成功!');
                                    }
                                    else {
                                        utils.message(res.msg);
                                    }
                                }).error(function () {
                                    utils.message('读取失败！');
                                })
                            }
                        }
                    }]
                });
            }
        }])

