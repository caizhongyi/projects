angular.module('settlement.contract.getContractByOrderNo', [
    'settlement.contract.getContractByOrderNo.service'
])
    .controller('controller.settlement.contract.getContractByOrderNo',
    ["$scope", "$rootScope", "$stateParams", "$modal", "$state",  "contractDetail" ,"utils", "$cookieStore",
        function ($scope, $rootScope, $stateParams, $modal, $state,  contractDetail, utils, $cookieStore) {
            $scope.userInfo = $cookieStore.get("user");
            $scope.showImage = function(src){
                $scope.cropZoomImage = src.replace(/_200-200c_/, "_0-0_");
            }
            contractDetail.get( $stateParams.order_no ).success(function( res ){
                if (res.code == 0) {
                    $scope.payment_amount_sum = 0;
                    $scope.handling_fee_sum = 0;
                    $scope.dept_handling_fee_sum = 0;
                    $scope.fee_sum = 0;
                    $scope.item = res.data;
                    $scope.transfer_info = res.data.transfer_info;
                    $scope.apply_info = res.data.apply_info;
                    for( i = 0;i < $scope.transfer_info.length; i++){
                        $scope.payment_amount_sum += $scope.transfer_info[i].payment_amount;
                        if($scope.transfer_info[i].is_free_handling_fee != 1){
                            $scope.handling_fee_sum += $scope.transfer_info[i].handling_fee;
                            $scope.dept_handling_fee_sum += $scope.transfer_info[i].dept_handling_fee;
                        }
                    }
                    for( i = 0;i < $scope.apply_info.length; i++){
                        if($scope.apply_info[i].status != 3 && $scope.apply_info[i].status != 4){
                            $scope.fee_sum += $scope.apply_info[i].fee;
                        }
                    }
					 var contractPic = $scope.item.contract_pic ? $scope.item.contract_pic : new Array();
                // console.log($scope.item.orderInfo.order_contract.certificate_pic);
					var certificatePic = $scope.item.certificate_pic ? $scope.item.certificate_pic : new Array();
					// console.log($scope.item.applyInfo.file_content);;
					$scope.item.pics =  contractPic.concat(certificatePic);
                }
                else {
                    utils.message(res.msg);
                }
                }).error(function () {
                    utils.message('读取失败！');
                })
            $scope.utils = utils;
            $scope.editContract = function(){
                $state.go('settlement-order-editOrder',{ order_no : $scope.item.order_no , type : 1 });
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
                                contractDetail.noticeTransfer( $scope.submitter ).success(function( res ){
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

