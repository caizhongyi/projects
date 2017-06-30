/**
 * Created by DTO on 2015/4/27.
 * ?
 */
angular.module('settlement.apply.applyFee.jhcservicefeeapply', ["settlement.apply.applyFee.service"])
    .controller('controller.settlement.apply.applyFee.jhcservicefeeapply',
    ["$scope", "$rootScope", "$stateParams", "$modal", "$state", "applyFee", "$filter", "$cookieStore","$timeout", "utils",
        function ($scope, $rootScope, $stateParams, $modal, $state, applyFee,  $filter, $cookieStore , $timeout , utils ) {
            applyFee.get( $stateParams ).success(function( res ){
                if (res.code == 0) {
                    $scope.item = res.data;
                    $scope.subitem.province = $scope.item.province;
                    $scope.subitem.city = $scope.item.city;
                    $scope.subitem.to_dept_id = $scope.item.dept_id;
                    $scope.subitem.is_jhc = $scope.item.order.is_jhc;
                }
                else {
                    utils.message(res.msg);
                }
            }).error(function () {
                utils.message('读取失败！');
            })

            $scope.subitem = {};

            $scope.subitem.other_fee = $scope.subitem.other_fee || 0;
            $scope.subitem.transfer_fee = $scope.subitem.transfer_fee || 0;
            $scope.subitem.anency_fee = $scope.subitem.anency_fee || 0;
            $scope.subitem.brokerage = $scope.subitem.brokerage || 0;
            $scope.subitem.dept_payment = $scope.subitem.dept_payment || 0;

            $scope.$watch(function(){
                $scope.subitem.fee =  parseFloat( $scope.subitem.dept_payment || 0 ) + parseFloat( $scope.subitem.other_fee || 0 ) + parseFloat( $scope.subitem.transfer_fee || 0) + parseFloat( $scope.subitem.anency_fee || 0) + parseFloat( $scope.subitem.brokerage || 0)
            });

            $scope.$watch('subitem.to_dept_id',function(){
                if($scope.subitem.to_dept_id == null){
                    return;
                }
                applyFee.getDeptAccountByDeptId({ dept_id : $scope.subitem.to_dept_id }).success(function( res ){
                    $scope.item  = angular.extend( $scope.item , res.data );
                    if (res.code == 0) {
                        if( ! res.data.is_bind  ){
                            applyFee.getPaBindByDeptId({ dept_id : $scope.subitem.to_dept_id }).success(function( res ) {
                                if(res.code != 0){
                                    //utils.message(res.msg);
                                    return;
                                }
                                if( ! res.data.is_pa_bind && res.data.be == 1  ) {
                                    $modal.open({
                                        templateUrl: "tpl-bank-card-auth.html",
                                        resolve: {
                                            item: function () {
                                                return res.data;
                                            }
                                        },
                                        backdrop: 'static',
                                        size: 'md',
                                        controller: ["$scope", "$rootScope", "$modalInstance", "item", "$state", "$location", "applyFee", function ($scope, $rootScope, $modalInstance, item, $state, $location, applyFee) {

                                            $scope.sendCode = applyFee.sendCode;
                                            $scope.item = item;
                                            $scope.interacted = function (field) {
                                                return (field.$dirty && $scope.submitted) || field.isblur;
                                            }
                                            $scope.addSubmit = function (isValid) {
                                                if (isValid && !$scope.submitted) {
                                                    $scope.submitted = true;
                                                    var data = {
                                                        phone_no: $scope.item.linkman_phone,
                                                        code: $scope.item.code,
                                                        id: $scope.item.id
                                                    }
                                                    applyFee.bindBankCard(data).success(function (res) {
                                                        $scope.submitted = false;
                                                        if (res.code == 0) {
                                                            utils.message(res.msg || '绑定成功！');
                                                            $modalInstance.dismiss('cancel');
                                                        }
                                                        else {
                                                            utils.message(res.msg || '绑定失败！');
                                                        }
                                                    })
                                                }
                                            }
                                            /*  $scope.ok = function(){
                                             if( !$scope.item.linkman_phone ){
                                             utils.message("手机号码不能为空！");
                                             return ;
                                             }
                                             if( !$scope.item.code ){
                                             utils.message("验证码不能为空！");
                                             return ;
                                             }
                                             var data = {
                                             phone_no : $scope.item.linkman_phone,
                                             code : $scope.item.code,
                                             id : $scope.item.id
                                             }
                                             applyFee.bindBankCard( data ).success(function( res ){
                                             if( res.code == 0 ){
                                             $scope.submitted1 = false;
                                             $modalInstance.dismiss('cancel');
                                             }
                                             else{
                                             utils.message( res.msg || '提交失败！');
                                             }
                                             })
                                             }
                                             */
                                            $scope.cancel = function () {
                                                $modalInstance.dismiss('cancel');
                                            }
                                        }]
                                    });
                                }
                            })
                        }
                    }
                    else {
                        utils.message(res.msg);
                    }
                })
            });

            $scope.interacted = function( field ){
                return (field.$dirty  && $scope.submitted) || field.isblur;
            };
            $scope.submitted = false;
            $scope.submit = function( isValid ){
                $scope.submitted = true;
                if( isValid ){
                    $scope.subitem.order_no = $scope.item.order_no;
                    $scope.subitem.is_jhc = 1;
                    applyFee.jhcserviceFeeApply( $scope.subitem ).success(function ( res ) {
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
                        $scope.submitted = false;
                        utils.message('添加失败！');
                    })
                }
            }
        }])
