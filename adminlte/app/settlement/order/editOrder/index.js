/**
 * Created by DTO on 2015/4/27.
 * ?
 */
angular.module('settlement.order.editOrder', [
    'settlement.order.editOrder.service',
    'utils.service'
])
    .controller('controller.settlement.order.editOrder',
    ["$scope", "$rootScope", "$stateParams", "$modal", "$state",  "editOrder" , "utils", "$cookieStore",
        function ($scope, $rootScope, $stateParams, $modal, $state,  editOrder , utils , $cookieStore) {
         //   $scope.carNumberDisabled = $cookieStore.get("user").username != 'admin';

            $scope.utils = utils;
            editOrder.get( $stateParams ).success(function( res ){
                $scope.item = res.data;
                $scope.item.fee_sum = $scope.item.fee;
            })

            $scope.submittedEdit = false;
            $scope.interacted = function( field ){
                return  (utils.browser().msie ? (field.$dirty && $scope.submittedEdit) : (field.$dirty || $scope.submittedEdit))  || field.isblur;
            }
            $scope.submitEdit = function( isValid ){
                $scope.submittedEdit = true;
                if( isValid ){
                    editOrder.updateOrderFee( $scope.item ).success(function ( res ) {
                        if (res.code == 0) {
                            utils.message( res.msg || '保存成功！');
                            $state.go('settlement-order-orderList')
                        }
                        else {
                            utils.message( res.msg || res.message ) ;
                        }
                    }).error(function () {
                        utils.message('添加失败！');
                    })
                }
            }

            $scope.submitted = false;
            $scope.interacted = function( field ){
                return  (utils.browser().msie ? (field.$dirty && $scope.submitted) : (field.$dirty || $scope.submitted)) || field.isblur;
            }
            $scope.submit = function( isValid ){
                $scope.submitted = true;
                if( isValid ){
                    editOrder.updateOrder( $scope.item ).success(function ( res ) {
                        if (res.code == 0) {
                            utils.message( res.msg || '保存成功！');
                            $state.go('settlement-order-orderList');
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

