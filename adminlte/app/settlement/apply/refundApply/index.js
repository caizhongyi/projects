/**
 * Created by DTO on 2015/4/27.
 * ?
 */
angular.module('settlement.apply.refundApply', [
    'settlement.apply.refundApply.service',
    'utils.service'
])
    .controller('controller.settlement.apply.refundApply',
    ["$scope", "$rootScope", "$stateParams", "$modal", "$state",  "applyRefund" , "$timeout", "utils",
        function ($scope, $rootScope, $stateParams, $modal, $state,  applyRefund , $timeout, utils) {
            $scope.utils = utils;

            $scope.item = {};
            applyRefund.applyRefundFee( $stateParams ).success(function( res ){
                if (res.code == 0) {
                    $scope.item = res.data;

                    $scope.item.transfer_info.forEach(function(n){
                        if(n.card_no_mid){
                            n.card_no2 = n.card_no_mid;
                        }
                    });

                    if( $scope.item.transfer_info.length == 1 && $scope.item.refund_type!=1){
                        $scope.item.transfer_info[0].selected = true ;
                    }
                    else{
                        $scope.item.transfer_info_card_no = $scope.item.transfer_info[0].card_no;
                    }


                    function sum (){
                        var s = 0 ;

                        $scope.item.transfer_info.forEach(function( n ){
                            if( $scope.item.refund_type == 1){
                                n.fee = n.payment_amount - n.applied_amount;
                            }
                            s += parseFloat(n.fee || 0 );
                        })
                        return s ;
                    }

                    $scope.$watch(  function(  ){
                        $scope.item.transfer_info.forEach(function( n ){
                            var dif = (n.payment_amount -  n.refund_amount) > $scope.item.max_detail.car_fee ? $scope.item.max_detail.car_fee : (n.payment_amount -  n.refund_amount);
                            if( n.fee > dif ){
                                n.fee = dif ;
                            }
                            $scope.item.sum = sum()
                        })
                    })

                }
                else {
                    utils.message(res.msg || '请求失败！');
                }

            }).error(function () {
                utils.message('读取失败！');
            })


            $scope.$watch('item.transfer_info_card_no', function( val ){

                $scope.item.t_transfer_info = {};
                if(val){
                    $scope.item.transfer_info.forEach( function(n){
                        if(n.card_no == val){
                            $scope.item.t_transfer_info.payee_realname = n.payee_realname;
                            $scope.item.t_transfer_info.payee_bank = n.payee_bank;
                            $scope.item.t_transfer_info.payee_bank_branch = n.payee_bank_branch;
                        }
                    })
                }
            })
            $scope.selected = function(){
                this.row.required = this.row.selected;
                return ;
            }

            $scope.serviceSelected = function(){
                this.t_item.required = this.t_item.selected;
                return ;
            }

            $scope.checkCard = function(){
                $scope.item.card_no =  this.t_item.card_no;
                return this.$index == 0 ? true : false;
            }

            $scope.interacted = function( field , submitted ){
                submitted = submitted || 'submitted';
                if(field){
                    return  (utils.browser().msie ? (field.$dirty && $scope[submitted] ) : (field.$dirty || $scope[submitted] )) || field.isblur;
                }
               // return  ( field.$dirty ||  $scope[submitted] ) || field.isblur;
            }

            $scope.submit = function(isValid ,submitted){

                submitted = submitted || 'submitted';
                $scope[submitted] = true;

                $timeout(function(){
                    if (!isValid) {
                        utils.message("信息不完整!");
                    }
                    else{
                    
                        if( $scope.item.refund_type == 3){
                            $scope.item.refund = [];

                            $scope.item.t_transfer_info.card_no = $scope.item.transfer_info_card_no;
                            $scope.item.t_transfer_info.fee = parseFloat( $scope.item.t_transfer_info.brokerage) + parseFloat( $scope.item.t_transfer_info.anency_fee) +
                            parseFloat($scope.item.t_transfer_info.transfer_fee) + parseFloat($scope.item.t_transfer_info.other_fee) ;
                            $scope.item.refund.push( $scope.item.t_transfer_info );
                        }
                        else{
                            $scope.item.refund =   $scope.item.transfer_info;
                        }

                        applyRefund.save( {
                            refund_type :  $scope.item.refund_type,
                            order_no :  $scope.item.order_no,
                            refund :  $scope.item.refund,
                            reason :  $scope.item.reason
                        }).success(function( res ){
                            if (res.code == 0) {
                                utils.message(res.msg || '申请退款成功！');
                                $state.go('settlement-order-orderList');
                            }
                            else {
                                utils.message(res.msg);
                            }
                        }).error(function () {
                            utils.message('读取失败！');
                        })
                    }
                })
            }

            $scope.submitService = function(isValid ,submitted){

                submitted = submitted || 'submitted';
                $scope[submitted] = true;

                if (!isValid) {
                    utils.message("信息不完整!");
                }
                else{

                    if( $scope.item.refund_type == 3){

                        $scope.item.refund =   $scope.item.transfer_info;
                        applyRefund.saveService( {
                            refund_type :  $scope.item.refund_type,
                            order_no :  $scope.item.order_no,
                            refund :  $scope.item.refund,
                            reason :  $scope.item.reason
                        }).success(function( res ){
                            if (res.code == 0) {
                                utils.message(res.msg || '申请退款成功！');
                                $state.go('settlement-order-orderList');
                            }
                            else {
                                utils.message(res.msg);
                            }
                        }).error(function () {
                            utils.message('读取失败！');
                        })

                    } else{
                        $scope.item.refund =   $scope.item.transfer_info;

                        applyRefund.save( {
                            refund_type :  $scope.item.refund_type,
                            order_no :  $scope.item.order_no,
                            refund :  $scope.item.refund,
                            reason :  $scope.item.reason
                        }).success(function( res ){
                            if (res.code == 0) {
                                utils.message(res.msg || '申请退款成功！');
                                $state.go('settlement-order-orderList');
                            }
                            else {
                                utils.message(res.msg);
                            }
                        }).error(function () {
                            utils.message('读取失败！');
                        })
                    }
                }
            }

        }])

