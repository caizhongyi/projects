/**
 * Created by Administrator on 2015/7/29.
 */
angular.module('settlement.apply.applyFee.carfeeapply', ["settlement.apply.applyFee.service"])
    .controller('controller.settlement.apply.applyFee.carfeeapply',
    ["$scope", "$rootScope", "$stateParams", "$modal", "$state", "applyFee", "$filter", "$cookieStore","$timeout", "utils",
        function ($scope, $rootScope, $stateParams, $modal, $state, applyFee,  $filter, $cookieStore , $timeout , utils ) {
            applyFee.get( $stateParams ).success(function( res ){
                if (res.code == 0) {
                    $scope.item = res.data;

                    applyFee.avoidCode( '1', $scope.item.order_no ).success(function( res ){
                        if(res.code == 0){
                            $scope.item.avoidCode = 0;
                        } else {
                            $scope.item.avoidCode = 1;
                        }
                    }).error(function () {})

                    utils.getUserMobile( $scope.profile.id ).success(function( res ){
                        if(res.code == 0){
                            $scope.profile.lastestMobile = res.data.mobile;
                            $scope.profile.latestMobile = res.data.mobile;
                        } else {
                            $scope.profile.lastestMobile = '';
                            $scope.profile.latestMobile = '';
                        }
                    }).error(function () {})

                }
                else {
                    utils.message(res.msg);
                }
            }).error(function () {
                utils.message('读取失败！');
            })

            $scope.submitter = {} ;
            $scope.interacted = function( field ){
                return  (utils.browser().msie ? (field.$dirty && $scope.submitted) : (field.$dirty || $scope.submitted)) || field.isblur;
            }
            $scope.submitted = false;
            $scope.submit = function( isValid ){
                $scope.submitted = true;
                if( isValid ){
                    $scope.submitter.order_no = $scope.item.order_no;
                    $scope.submitter.payee_bank = $scope.item.payee_bank;
                    $scope.submitter.payee_bank_branch = $scope.item.payee_bank_branch;
                    applyFee.carFeeApply( $scope.submitter ).success(function ( res ) {
                        $timeout(function(){
                            $scope.submitted = false;
                            if (res.code == 0) {
                                utils.message( res.msg || res.message || '保存成功！' ) ;
                                $state.go('settlement-order-orderList');
                            }
                            else {
                                utils.message( res.msg || res.message ) ;
                            }
                        })
                    }).error(function () {
                        utils.message('添加失败！');
                        $scope.submitted = false;
                    })
                } else {
                    $scope.submitted = false;
                }
            }
        }])