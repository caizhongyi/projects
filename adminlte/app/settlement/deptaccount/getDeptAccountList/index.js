/**
 * Created by DTO on 2015/4/27.
 * ?
 */
angular.module('settlement.deptAccount.getDeptAccountList', [
    'settlement.deptAccount.getDeptAccountList.service',
    "settlement.utils.service", "settlement.utils.directive"
])
.controller('controller.settlement.deptAccount.getDeptAccountList',
["$scope", "$rootScope", "$stateParams", "$modal", "$state",  "deptAccount" ,"utils","$filter",
    function ($scope, $rootScope, $stateParams, $modal, $state,  deptAccount, utils, $filter) {

        $scope.deptAccount = deptAccount ;
      
		$scope.utils = utils;
		
        $scope.statusOpen = function(){
           if(confirm("是否要开启？")){
               var item = this.item;
               deptAccount.setDeptAccountStatus({ id : this.item.id , status : 1 }).success(function( res ){
                   if( res.code == 0 ){
                       item.status = '正常';
                   }
                   else {
                       utils.message( res.msg || res.message ) ;
                   }
               }).error(function () {
                   utils.message('服务器无响应！');
               })
           }
        }

        $scope.statusStop = function(){
            if(confirm("是否要停用？")) {
                var item = this.item;
                deptAccount.setDeptAccountStatus({id: this.item.id, status: 2 }).success(function (res) {
                    if (res.code == 0) {
                        item.status = '暂停';
                    }
                    else {
                        utils.message(res.msg || res.message);
                    }
                }).error(function () {
                    utils.message('服务器无响应！');
                })
            }
        }

        $scope.open = function(){
            var item = this.item ;
            $modal.open({
                templateUrl: "tpl-update.html" ,
                resolve: {
                    item: function () {
                        return item;
                    }
                },
                size:  'md',
                controller:   [  "$scope", "$rootScope", "$modalInstance", "item", "$state",'$cookieStore','$filter', 'deptAccount', '$timeout' ,"utils",function(
                    $scope, $rootScope, $modalInstance, item, $state, $cookieStore ,$filter ,deptAccount,$timeout ,utils
                ){
					$scope.maxDate = $filter('date')(new Date(),'yyyy-MM-dd');
                    $scope.item = angular.extend({} , item );
                    $scope.submitted = false;
                    $scope.interacted = function( field ){
                        return  (utils.browser().msie ? (field.$dirty && $scope.submitted) : (field.$dirty || $scope.submitted)) || field.isblur;
                    }

                    $scope.item.account_id =  item.id ;
                    $scope.item.create_user_name = $cookieStore.get("user").nickname;
                    $scope.item.create_user_id = $cookieStore.get("user").id;
                    $scope.item.create_time =  $filter('date')(new Date() , 'yyyy-MM-dd');

                    $scope.submitAddForm = function( isValid ){
                        $timeout(function(){
                            $scope.submitted = true;
                            if( isValid ){
                                deptAccount.addDeptAccountDepositApply( $scope.item ).success(function ( res ) {
                                    if (res.code == 0) {
                                        utils.message( res.msg || res.message || '预存款已提交！' ) ;
                                        $timeout(function(){
                                            $modalInstance.dismiss('cancel');
                                            $state.reload();
                                        })
                                    }
                                    else {
                                        utils.message( res.msg || res.message ) ;
                                    }
                                }).error(function () {
                                    utils.message('添加失败！');
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

        $scope.refund = function(){
            var item = this.item;
            $modal.open({
                templateUrl: "tpl-refund.html" ,
                resolve: {
                    item: function () {
                        return item;
                    }
                },
                size:  'md',
                controller:   [  "$scope", "$rootScope", "$modalInstance", "item", "$state",'$cookieStore','$filter', 'deptAccount', '$timeout' ,"utils",function(
                    $scope, $rootScope, $modalInstance, item, $state, $cookieStore ,$filter ,deptAccount, $timeout , uitls
                ){
                    $scope.item = angular.extend({} , item );
                    $scope.submitted = false;
                    $scope.interacted = function( field ){
                        return  (utils.browser().msie ? (field.$dirty && $scope.submitted) : (field.$dirty || $scope.submitted)) || field.isblur;
                    }
                    $scope.item.create_user_name = $cookieStore.get("user").nickname;
                    $scope.item.account_id = item.id ;
                    $scope.item.create_user_id = $cookieStore.get("user").id;
                    $scope.item.create_time = $filter('date')(new Date() , 'yyyy-MM-dd');

                    $scope.$watch('item.money_refund',function( val ){
                        if(  $scope.item.money_refund >  $scope.item.balance  ){
                            $scope.item.money_refund = $scope.item.balance  ;
                        }
                    })


                    $scope.submitAddForm = function( isValid ){
                        $timeout(function(){
                            $scope.submitted = true;
                            if( isValid ){
                                deptAccount.addDeptAccountRefundApply( $scope.item ).success(function ( res ) {
                                    if (res.code == 0) {
                                        utils.message( res.msg || res.message || '退款已提交！' ) ;
                                        $timeout(function(){
                                            $modalInstance.dismiss('cancel');
                                            $state.reload();
                                        })
                                    }
                                    else {
                                        utils.message( res.msg || res.message ) ;
                                    }
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
		$scope.reportDetail = function(){
            $state.go('settlement-deptAccount-getDeptAccountDetail', { dept_id : this.item.dept_id });
        }

        $scope.goToAdd = function(){
            $state.go('settlement-deptAccount-updateDeptAccount');
        }

        $scope.goToEdit = function(){
            $state.go('settlement-deptAccount-updateDeptAccount' , { id : this.item.id });
        }

        $scope.setDeptAccountStatus = function(){
            deptAccount.setDeptAccountStatus().success(function( res ){
                if (res.code == 0) {
                    $scope.item = res.data;
                }
                else {
                    utils.message(res.msg);
                }
            }).error(function () {
                utils.message('读取失败！');
            })
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
                    $scope.submitter.mobile = item.mobile;
                    $scope.submitter.dept_id = item.dept_id;
                    $scope.submitted = false;
                    $scope.interacted = function( field ){
                        $scope.interacted = function( field ){
                            return  (utils.browser().msie ? (field.$dirty && $scope.submitted) : (field.$dirty || $scope.submitted)) || field.isblur;
                        }
                    }

                    $scope.ok = function(isValid){
                        $scope.submitted = true;
                        if( isValid ){
                            deptAccount.noticeTransfer( $scope.submitter ).success(function( res ){
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


