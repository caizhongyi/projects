/**
 * Created by DTO on 2015/4/27.
 * ?
 */
angular.module('settlement.deptAccountDepositApply.getDeptAccountDepositApplyList', [
    'settlement.deptAccountDepositApply.getDeptAccountDepositApplyList.service',
    'utils.service'
])
    .controller('controller.settlement.deptAccountDepositApply.getDeptAccountDepositApplyList',
    ["$scope", "$rootScope", "$stateParams", "$modal", "$state",  "depositApply" ,
        function ($scope, $rootScope, $stateParams, $modal, $state,  depositApply ) {

            $scope.depositApply = depositApply;
            $scope.showExcel = function(){
                depositApply.excel($scope.searchCondition);
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
                    controller:   [  "$scope", "$rootScope", "$modalInstance", "item", "$state",'$cookieStore','$filter', 'depositApply', '$timeout' ,"utils",function(
                        $scope, $rootScope, $modalInstance, item, $state, $cookieStore ,$filter ,depositApply, $timeout , utils
                    ){
                        $scope.item = angular.extend({} , item );

                        $scope.submitted = false;
                        $scope.interacted = function( field ){
                            return  (utils.browser().msie ? (field.$dirty && $scope.submitted) : (field.$dirty || $scope.submitted)) || field.isblur;
                        }
                        $scope.item.create_user_name = $cookieStore.get("user").nickname;
                        $scope.item.account_id = item.id ;
                        $scope.item.create_user_id = $cookieStore.get("user").id;


                        $scope.rejected = function(){
                            $scope.item.status = 2;
                            depositApply.checkDeptAccountDepositApply( $scope.item ).success(function ( res ) {
                                if (res.code == 0) {
                                    $timeout(function(){
                                        utils.message( res.msg || res.message || '已拒绝复核！' ) ;
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

                        $scope.submitAddForm = function( isValid ){
                            $timeout(function(){
                                $scope.submitted = true;
                                if( isValid ){
                                    $scope.item.status = 1;
                                    depositApply.checkDeptAccountDepositApply( $scope.item ).success(function ( res ) {
                                        if (res.code == 0) {
                                            $timeout(function(){
                                                utils.message( res.msg || res.message || '复核成功！' ) ;
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

        }])

