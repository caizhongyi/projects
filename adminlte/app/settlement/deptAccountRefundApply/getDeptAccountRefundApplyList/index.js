/**
 * Created by DTO on 2015/4/27.
 * ?
 */
angular.module('settlement.deptAccountRefundApply.getDeptAccountRefundApplyList', [
    'settlement.deptAccountRefundApply.getDeptAccountRefundApplyList.service',
    'settlement.utils.service'
])
    .controller('controller.settlement.deptAccountRefundApply.getDeptAccountRefundApplyList',
    ["$scope", "$rootScope", "$stateParams", "$modal", "$state",  "refundApply" ,"utils",
        function ($scope, $rootScope, $stateParams, $modal, $state,  refundApply , utils) {

            $scope.refundApply = refundApply;

			$scope.utils = utils;

            $scope.preview = function(){
                var item = this.item;
                $modal.open({
                    templateUrl: "tpl-preview.html" ,
                    resolve: {
                        item: function () {
                            return item;
                        }
                    },
                    size:  'md',
                    controller:   [  "$scope", "$rootScope", "$modalInstance", "item", "$state",'$cookieStore','$filter', 'refundApply', '$timeout' ,function(
                        $scope, $rootScope, $modalInstance, item, $state, $cookieStore ,$filter ,refundApply, $timeout
                    ){
                        $scope.item = angular.extend({} , item );

                        $scope.ok = function(){
                            $modalInstance.dismiss('cancel');
                        }
                        $scope.cancel = function(){
                            $modalInstance.dismiss('cancel');
                        }
                    }]
                });
            }

            $scope.pay = function(){
                var item = this.item;
                $modal.open({
                    templateUrl: "tpl-pay.html" ,
                    resolve: {
                        item: function () {
                            return item;
                        }
                    },
                    size:  'md',
                    controller:   [  "$scope", "$rootScope", "$modalInstance", "item", "$state",'$cookieStore','$filter', 'refundApply', '$timeout' , "utils",function(
                        $scope, $rootScope, $modalInstance, item, $state, $cookieStore ,$filter ,refundApply, $timeout, utils
                    ){
                        $scope.item = angular.extend({} , item );

                        $scope.submitted = false;
                        $scope.interacted = function( field ){
                            return  (utils.browser().msie ? (field.$dirty && $scope.submitted) : (field.$dirty || $scope.submitted)) || field.isblur;
                        }
                        $scope.item.pay_real_name = $cookieStore.get("user").nickname;
                        $scope.item.account_id = item.id ;
                        $scope.item.pay_user_id = $cookieStore.get("user").id;
                        $scope.item.pay_create_time = $filter('date')( new Date() , 'yyyy-MM-dd');

                        $scope.item.pay_money =  $scope.item.money_refund;
                        $scope.item.pay_time = $filter('date')( new Date() , 'yyyy-MM-dd');

                        $scope.$watch('item.pay_money', function(){
                            $scope.item.pay_money =  $scope.item.pay_money > $scope.item.money_refund ? $scope.item.money_refund : $scope.item.pay_money ;
                        })

                        $scope.submitAddForm = function( isValid ){
                            $timeout(function(){
                                $scope.submitted = true;
                                if( isValid ){
                                    $scope.item.status = 3;
                                    refundApply.payDeptAccountRefund( $scope.item ).success(function ( res ) {
                                        $timeout(function(){
                                            if (res.code == 0) {
                                                    utils.message( res.msg || res.message || '支付成功！' ) ;
                                                    $modalInstance.dismiss('cancel');
                                                    $state.reload();

                                            }
                                            else {
                                                utils.message( res.msg || res.message ) ;
                                        }
                                        })
                                    }).error(function () {
                                        utils.message('服务器无响应！');
                                    })
                                }
                            })

                        }

                        $scope.ok = function(){
                            $modalInstance.dismiss('cancel');
                        }
                        $scope.cancel = function(){
                            $modalInstance.dismiss('cancel');
                        }
                    }]
                });
            }

            $scope.check = function(){
                var item = this.item;
                $modal.open({
                    templateUrl: "tpl-check.html" ,
                    resolve: {
                        item: function () {
                            return item;
                        }
                    },
                    size:  'md',
                    controller:   [  "$scope", "$rootScope", "$modalInstance", "item", "$state",'$cookieStore','$filter', 'refundApply', '$timeout' , "utils",function(
                        $scope, $rootScope, $modalInstance, item, $state, $cookieStore ,$filter ,refundApply, $timeout,utils
                    ){
                        $scope.item = angular.extend({} , item );

                        $scope.submitted = false;
                        $scope.interacted = function( field ){
                            return  (utils.browser().msie ? (field.$dirty && $scope.submitted) : (field.$dirty || $scope.submitted)) || field.isblur;
                        }
                        $scope.item.check_real_name = $cookieStore.get("user").real_name;
                        $scope.item.account_id = item.id ;
                        $scope.item.check_user_id = $cookieStore.get("user").id;
                        $scope.item.check_time = $filter('date')( new Date() , 'yyyy-MM-dd');

                        $scope.rejected = function(){
                            $scope.item.status = 2;
                            refundApply.checkDeptAccountRefundApply( $scope.item ).success(function ( res ) {
                                $timeout(function(){
                                    if (res.code == 0) {
                                            utils.message( res.msg || res.message || '已拒绝复核！' ) ;
                                            $modalInstance.dismiss('cancel');
                                            $state.reload();

                                    }
                                    else {
                                        utils.message( res.msg || res.message ) ;
                                }
                                })
                            }).error(function () {
                                utils.message('服务器无响应！');
                            })
                        }



                        $scope.submitAddForm = function( isValid ){
                            $timeout(function(){
                                $scope.submitted = true;
                                if( isValid ){
                                    $scope.item.status = 1;
                                    refundApply.checkDeptAccountRefundApply( $scope.item ).success(function ( res ) {
                                        $timeout(function(){
                                            if (res.code == 0) {
                                                    utils.message( res.msg || res.message || '复核成功！' ) ;
                                                    $modalInstance.dismiss('cancel');
                                                    $state.reload();
                                            }
                                            else {
                                                utils.message( res.msg || res.message ) ;
                                            }
                                        })
                                    }).error(function () {
                                        utils.message('服务器无响应！');
                                    })
                                }
                            })

                        }

                        $scope.ok = function(){
                            $modalInstance.dismiss('cancel');
                        }
                        $scope.cancel = function(){
                            $modalInstance.dismiss('cancel');
                        }
                    }]
                });
            }

        }])

