/**
 * Created by DTO on 2015/4/27.
 * ?
 */
angular.module('settlement.reportDept.reportDeptDetail', [
    'settlement.reportDept.reportDeptDetail.service',
    "settlement.utils.service", "settlement.utils.directive"
])
.controller('controller.settlement.reportDept.reportDeptDetail',
["$scope", "$rootScope", "$stateParams", "$modal", "$state",  "reportDeptDetail" , "utils",
    function ($scope, $rootScope, $stateParams, $modal, $state,  reportDeptDetail, utils) {
        $scope.utils = utils;
        $scope.reportDeptDetail = reportDeptDetail ;
            $scope.showExcel = function(){
                reportDeptDetail.excel($scope.searchCondition);
            }
            $scope.$on('seniorTableLoaded', function( e ,res ){
                var items = res.data.list;
                $scope.item.fee1_total = 0 ;
                $scope.item.fee2_total = 0 ;
                $scope.item.balance_total = 0 ;
				if(!$scope.searchCondition.start_date){
					$scope.searchCondition.start_date = res.data.default_start_date;
				}
				if(!$scope.searchCondition.end_date){
					$scope.searchCondition.end_date = res.data.default_end_date;
				}
                items.forEach(function( n , i ){
                n.infee = (n.source_type == 1 || n.source_type == 3 || n.source_type == 5) ? n.fee : 0 ;
                n.outfee = (n.source_type == 2 || n.source_type == 4) ? Math.abs(n.fee) : 0;
                $scope.item.fee1_total += n.infee ;
                $scope.item.fee2_total += n.outfee  ;
            })
				if(items.length >0 ){
					items.unshift({
						sumFee : res.data.pre_fee ,
						pre_fee : res.data.pre_fee
					})
				}
        })

        $scope.sealAccount = function() {
            var item = $scope.item;

            $modal.open({
                templateUrl: "tpl-seal-account.html" ,
                resolve: {
                    item: function () {
                        return item;
                    }
                },
                size:  'lg',
                controller:   [  "$scope", "$rootScope", "$modalInstance", "item", "$state", "$sce", "reportDeptDetail", "utils", function($scope, $rootScope, $modalInstance, item, $state, $sce , reportDeptDetail, utils ){
                    $scope.item = {};
                    $scope.searchInfo = function() {
                        if (!$scope.item.month) {
                            utils.message('月份不能为空!');
                            return;
                        }
                        reportDeptDetail.get(1, {month: $scope.item.month}).success(function ( res ) {
                            if (res.code == 0) {
                                $scope.list = res.data.list;
                                $scope.item = angular.extend({}, $scope.item,  res.data)
                            } else {
                                angular.message(res.msg);
                            }
                        }).error(function () {
                            angular.message('服务器无响应！');
                        })
                    }
                    $scope.cancel = function(){
                        $modalInstance.dismiss('cancel');
                    }
                    $scope.dialogSealAccount = function() {
                        var item = $scope.item;
                        if (!item.month || !$scope.list) {
                            utils.message('请先搜索!');
                            return;
                        }
                        $modal.open({
                            templateUrl: "tpl-confirm.html" ,
                            resolve: {
                                item: function () {
                                    return item;
                                }
                            },
                            size:  'sm',
                            controller:   [  "$scope", "$rootScope", "$modalInstance", "item", "$state", "$sce", "reportDeptDetail", "utils", function($scope, $rootScope, $modalInstance, item, $state, $sce , reportDeptDetail, utils ){
                                $scope.msg = '确定要封' + item.month + '的账， 封账之后的数据不可变动';
                                $scope.ok = function() {
                                    $scope.msg = '正在封账';
                                    reportDeptDetail.seal({month : item.month, type : 4}).success(function ( res ) {
                                        $modalInstance.dismiss('cancel');
                                        if (res.code == 0) {
                                            utils.message('封账成功!');
                                        } else {
                                            utils.message(res.msg);
                                        }
                                    }).error(function () {
                                        utils.message('服务器无响应！');
                                    })
                                }
                                $scope.cancel = function(){
                                    $modalInstance.dismiss('cancel');
                                }
                            }]

                        });
                    }
                }]

            });
        }

        $scope.viewSeal = function() {
            var item = $scope.item;

            $modal.open({
                templateUrl: "tpl-view-seal.html" ,
                resolve: {
                    item: function () {
                        return item;
                    }
                },
                size:  'lg',
                controller:   [  "$scope", "$rootScope", "$modalInstance", "item", "$state", "$sce", "reportDeptDetail", "utils", function($scope, $rootScope, $modalInstance, item, $state, $sce , reportDeptDetail, utils ){
                    $scope.item = {};
                    $scope.view = function() {
                        reportDeptDetail.viewSealInfo({month: $scope.item.month, type : 4}).success(function ( res ) {
                            if (res.code == 0) {
                                $scope.list = res.data ? res.data.list : {};
                                $scope.item = res.data ? angular.extend({}, $scope.item,  res.data) : $scope.item;
                            } else {
                                angular.message(res.msg);
                            }
                        }).error(function () {
                            angular.message('服务器无响应！');
                        })
                    }
                    $scope.cancel = function(){
                        $modalInstance.dismiss('cancel');
                    }
                }]
            });
        }
    }])


