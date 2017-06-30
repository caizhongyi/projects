/**
 * Created by Huph on 2015/7/15.
 * ?
 */
angular.module('settlement.reportSwiping.swingList', [
    'settlement.reportSwiping.swingList.service',
    "settlement.utils.service", "settlement.utils.directive"
])
.controller('controller.settlement.reportSwiping.swingList',
["$scope", "$rootScope", "$stateParams", "$modal", "$state",  "reportSwing" , "utils",
    function ($scope, $rootScope, $stateParams, $modal, $state,  reportSwing , utils) {
        $scope.reportSwing = reportSwing ;
        $scope.utils = utils;

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
                controller:   [  "$scope", "$rootScope", "$modalInstance", "item", "$state", "$sce", "reportSwing", "utils", function($scope, $rootScope, $modalInstance, item, $state, $sce , reportSwing, utils ){
                    $scope.item = {};
                    $scope.searchInfo = function() {
                        if (!$scope.item.month) {
                            utils.message('月份不能为空!');
                            return;
                        }
                        reportSwing.get(1, {month: $scope.item.month}).success(function ( res ) {
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
                            controller:   [  "$scope", "$rootScope", "$modalInstance", "item", "$state", "$sce", "reportSwing", "utils", function($scope, $rootScope, $modalInstance, item, $state, $sce , reportSwing, utils ){
                                $scope.msg = '确定要封' + item.month + '的账， 封账之后的数据不可变动';
                                $scope.ok = function() {
                                    $scope.msg = '正在封账';
                                    reportSwing.seal({month : item.month, type : 2}).success(function ( res ) {
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
                controller:   [  "$scope", "$rootScope", "$modalInstance", "item", "$state", "$sce", "reportSwing", "utils", function($scope, $rootScope, $modalInstance, item, $state, $sce , reportSwing, utils ){
                    $scope.item = {};
                    $scope.view = function() {
                        reportSwing.viewSealInfo({month: $scope.item.month, type : 2}).success(function ( res ) {
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
                    $scope.dialogSealAccount = function() {
                        var item = $scope.item;
                        $modal.open({
                            templateUrl: "tpl-confirm.html" ,
                            resolve: {
                                item: function () {
                                    return item;
                                }
                            },
                            size:  'sm',
                            controller:   [  "$scope", "$rootScope", "$modalInstance", "item", "$state", "$sce", "reportSwing", "utils", function($scope, $rootScope, $modalInstance, item, $state, $sce , reportSwing, utils ){
                                $scope.ok = function() {
                                    $scope.msg = '正在封账';

                                    reportSwing.seal({month : item.month}).success(function ( res ) {
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
    }])


