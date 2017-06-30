/**
 * Created by Huph on 2015/7/15.
 */
angular.module('settlement.reportSwiping.swipingList', [
    'settlement.reportSwiping.swipingList.service',
    "settlement.utils.service", "settlement.utils.directive"
])
.controller('controller.settlement.reportSwiping.swipingList',
["$scope", "$rootScope", "$stateParams", "$modal", "$state",  "reportSwiping" , "utils",
    function ($scope, $rootScope, $stateParams, $modal, $state,  reportSwiping, utils ) {

        $scope.reportSwiping = reportSwiping ;
        $scope.utils = utils;
        $scope.showExcel = function(){
            reportSwiping.excel($scope.searchCondition);
        }

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
                controller:   [  "$scope", "$rootScope", "$modalInstance", "item", "$state", "$sce", "reportSwiping", "utils", function($scope, $rootScope, $modalInstance, item, $state, $sce , $reportSwiping, utils ){
                    $scope.item = {};
                    $scope.searchInfo = function() {
                        if (!$scope.item.month) {
                            utils.message('月份不能为空!');
                            return;
                        }
                        $reportSwiping.get(1, {month: $scope.item.month}).success(function ( res ) {
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
                            controller:   [  "$scope", "$rootScope", "$modalInstance", "item", "$state", "$sce", "reportSwiping", "utils", function($scope, $rootScope, $modalInstance, item, $state, $sce , $reportSwiping, utils ){
                                $scope.msg = '确定要封' + item.month + '的账， 封账之后的数据不可变动';
                                $scope.ok = function() {
                                    $scope.msg = '正在封账';
                                    $reportSwiping.seal({month : item.month, type : 1}).success(function ( res ) {
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
                controller:   [  "$scope", "$rootScope", "$modalInstance", "item", "$state", "$sce", "reportSwiping", "utils", function($scope, $rootScope, $modalInstance, item, $state, $sce , $reportSwiping, utils ){
                    $scope.item = {};
                    $scope.view = function() {
                        $reportSwiping.viewSealInfo({month: $scope.item.month, type : 1}).success(function ( res ) {
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


