/**
 * Created by DTO on 2015/4/27.
 * ?
 */
angular.module('settlement.apply.applyInfo', ["settlement.apply.applyInfo.service"])
    .controller('controller.settlement.apply.applyInfo',
    ["$scope", "$rootScope", "$stateParams", "$modal", "$state",  "$filter", "applyInfo", "$timeout", "utils", "fileupload", 
        function ($scope, $rootScope, $stateParams, $modal, $state,  $filter, applyInfo ,$timeout, utils , fileupload ) {
            $scope.submitter = $scope.submitter || {};
            $scope.contractSubmit = $scope.submitter || {};
            $scope.utils = utils;
            $scope.showImage = function(src){
                $scope.cropZoomImage = src.replace(/_200-200c_/, "_0-0_");
            }
            applyInfo.get( $stateParams ).success(function( res ){
                $scope.item = res.data;
                $scope.payment_amount_sum = 0;
                $scope.dept_handling_fee_sum = 0;
                $scope.handling_fee_sum = 0;
                $scope.fee_sum = 0;
                // console.log($scope.item.orderInfo.order_contract.contract_pic);
                var contractPic = $scope.item.orderInfo.order_contract.contract_pic ? $scope.item.orderInfo.order_contract.contract_pic : new Array();
                // console.log($scope.item.orderInfo.order_contract.certificate_pic);
                var certificatePic = $scope.item.orderInfo.order_contract.certificate_pic ? $scope.item.orderInfo.order_contract.certificate_pic : new Array();
                // console.log($scope.item.applyInfo.file_content);
                var orderApplyPic = $scope.item.applyInfo.file_content ? $scope.item.applyInfo.file_content : new Array();

                $scope.item.pics =  contractPic.concat(certificatePic, orderApplyPic);


                $scope.alt = {};
                $scope.item.transferList && $scope.item.transferList.forEach(function( n ){
                    if(n.is_free_handling_fee != 1){
                        $scope.dept_handling_fee_sum += n.dept_handling_fee
                        $scope.handling_fee_sum += n.handling_fee
                    }
                    $scope.payment_amount_sum += n.payment_amount;

                    //添加签购单图片
                    n.sign_url ? $scope.item.pics.push(n.sign_url) : '';
                    n.card_type == 1 ? $scope.alt[n.sign_url] = '信用卡' : '';
                })

                $scope.item.applyList &&  $scope.item.applyList.forEach(function( n ){
                    if(n.status != 3 && n.status != 4) {
                        $scope.fee_sum += n.fee
                    }
                })
            })
            $scope.submitter.type = 'yes' ;
           /* applyInfo.get( $stateParams).success(function(){

            })*/

            //跳转到合同审核
            $scope.goContractCheck = function(){
                $state.go('settlement-contract-horizontal', { order_no : $scope.item.applyInfo.order_no });
            }

            //跳转到合同详情页
            $scope.goContractDetail = function(){
                $scope.contract();
            }

            $scope.pass = function(){
                $scope.submitter.type = 'yes';
                $scope.msg = '确定通过该审核吗?';
                $scope.submit($scope.form.$valid);
            }
            $scope.rejected = function(){
                $scope.submitter.type = 'no' ;
                $scope.msg = '确定拒绝该审核吗?';
                $scope.submit($scope.form.$valid);
            }
            $scope.back = function(){
                $state.go('settlement-apply-applyList');
            }

            $scope.interacted = function( field ){
                return  (field.$dirty && $scope.submitted) || field.isblur;
            }
            $scope.submit = function(isValid){
                if ($scope.submitter.type == 'no' && !isValid) {
                    return utils.message('请填写审核意见!');
                }
                $timeout(function(){
                    var item = $scope.item;
                    $modal.open({
                        templateUrl: "tpl-confirm.html" ,
                        resolve: {
                            item: function () {
                                return item;
                            },
                            submitter : function(){
                                return  $scope.submitter;
                            },
                            msg : function(){
                                return  $scope.msg;
                            }
                        },
                        size:  'sm',
                        controller:   [  "$scope", "$rootScope", "$modalInstance", "item", "submitter", "msg", "$state", "$filter", "applyInfo" ,
                        function($scope, $rootScope, $modalInstance, item, submitter , msg, $state ,$filter, applyInfo ){
                            $scope.item = item;
                            $scope.msg = msg;
                            $scope.submitter = submitter;
                            $scope.submitted = false;
                            $scope.ok = function(){
                                $scope.submitted = true;
                                $scope.submitter.id = $scope.item.applyInfo.id;
                                if ($scope.item.applyInfo.fee_type == 1) {
                                    $scope.submitter.payee_bank = $scope.item.applyInfo.payee_bank;
                                    $scope.submitter.payee_bank_branch = $scope.item.applyInfo.payee_bank_branch;
                                    console.log($scope.submitter)
                                }
                                applyInfo.check(  $scope.submitter ).success(function( res ){
                                    if (res.code == 0) {
                                        $modalInstance.dismiss('cancel');
                                        utils.message(res.msg || '保存成功!');
                                        $state.go('settlement-apply-applyList');
                                    }
                                    else {
                                        utils.message(res.msg);
                                    }
                                }).error(function () {
                                    utils.message('读取失败！');
                                })
                            }
                            $scope.cancel = function(){
                                $scope.submitted = false;
                                $modalInstance.dismiss('cancel');
                            }
                        }]
                    });
                })
            }

            $scope.checkContract = function(){
                $timeout(function(){
                    var item = $scope.item;
                    $modal.open({
                        templateUrl: "tpl-confirm-contract.html" ,
                        resolve: {
                            item: function () {
                                return item;
                            },
                        },
                        size:  'md',
                        controller:   [  "$scope", "$rootScope", "$modalInstance", "item", "$state", "$filter", "applyInfo",
                        function($scope, $rootScope, $modalInstance, item,  $state ,$filter, applyInfo ){
                            $scope.item = item;
                            $scope.submitter = $scope.submitter || {};
                            $scope.pass = function(){
                                if($scope.item)
                                    $scope.submitter.order_no = $scope.item.orderInfo.order_no;
                                $scope.submitter.check = 'yes';
                                applyInfo.passContract(  $scope.submitter ).success(function( res ){
                                    if (res.code == 0) {
                                        $modalInstance.dismiss('cancel');
                                        utils.message(res.msg || '保存成功!');
                                    } else {
                                        utils.message(res.msg);
                                    }
                                }).error(function () {
                                    utils.message('读取失败！');
                                })
                            }
                            $scope.reject = function(){
                                if (!$scope.submitter.check_note) {
                                    return utils.message('请填写驳回理由');
                                }
                                $scope.submitter.order_no = $scope.item.orderInfo.order_no;
                                applyInfo.rejectContract( $scope.submitter ).success(function( res ){
                                    if (res.code == 0) {
                                        $modalInstance.dismiss('cancel');
                                        utils.message(res.msg || '保存成功!');
                                    }
                                    else {
                                        utils.message(res.msg);
                                    }
                                }).error(function () {
                                    utils.message('读取失败！');
                                })
                            }
                            $scope.cancel = function(){
                                $modalInstance.dismiss('cancel');
                            }
                        }]
                    });
                })
            }
        }])

