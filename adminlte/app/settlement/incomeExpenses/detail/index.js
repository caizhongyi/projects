/**
 * Created by DTO on 2015/4/27.
 * ?
 */
angular.module('settlement.incomeExpenses.detail', [
    'settlement.incomeExpenses.detail.service',
    "settlement.utils.service", "settlement.utils.directive"
])
.controller('controller.settlement.incomeExpenses.detail',
["$scope", "$rootScope", "$stateParams", "$modal", "$state",  "incomeExpensesDetail" , "utils",
    function ($scope, $rootScope, $stateParams, $modal, $state,  incomeExpensesDetail, utils) {

        $scope.incomeExpensesDetail = incomeExpensesDetail ;
        $scope.utils = utils;
        $scope.$on('seniorTableLoaded', function( e ,res ){
            if (typeof($scope.searchCondition.start_date) === "undefined") {
                date = new Date();
                defaultDate = date.getFullYear() + '-';
                defaultDate += (date.getMonth() + 1) + '-' + date.getDate();
                $scope.searchCondition.start_date = defaultDate;
            };
        })

        $scope.searchList = function(){
            if (typeof($scope.searchCondition.pay_channel) === "undefined") {
                $scope.searchInfo();
            } else {
                $scope.searchCondition.bank = $scope.searchCondition.pay_bank;
                $state.go('settlement-reportSwiping-swingList' , $scope.searchCondition );
            }
        }

        $scope.$watch("searchCondition.start_date",function(val){
            if(val && !$scope.searchCondition.end_date){
                var time = $scope.searchCondition.start_date.split('-');
                var new_year = time[0];
                var new_month = time[1]++;
                if(new_month>12) {
                    new_month -=12;
                    new_year++;
                }
                var new_date = new Date(new_year,new_month,1);
                var lastDay = (new Date(new_date.getTime()-1000*60*60*24)).getDate();
                $scope.searchCondition.end_date = new_year + '-' + new_month + '-' + lastDay;
            }
        })

        $scope.downloadForm = function(){
            if (typeof($scope.searchCondition.pay_channel) === "undefined") {
                incomeExpensesDetail.excel($scope.searchCondition);
            } else {
                $state.go('settlement-reportSwiping-swingList' , $scope.searchCondition );
            }
        }

        //$scope.transferDetail = function(){
        //    $state.go('settlement-deptAccountTransferDetail-index' , { start_date : this.row.trade_date  , end_date : this.row.trade_date , order_no:this.row.order_no,pay_channel_type:this.row.pay_channel_type})
        //}
        $scope.transferDetail = function(){
            if(this.row.pay_channel_type == 6){
                $state.go('settlement-statement-detail6',{channel : this.row.pay_channel_type, settlement_date: this.row.trade_date});
            }else{
                $state.go('settlement-statement-transDetail',{pay_channel : this.row.pay_channel_type, entry_time: this.row.trade_date});
            }
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
                controller:   [  "$scope", "$rootScope", "$modalInstance", "item", "$state", "$sce", "incomeExpensesDetail", "utils", function($scope, $rootScope, $modalInstance, item, $state, $sce , incomeExpensesDetail, utils ){
                    $scope.item = {};
                    $scope.searchInfo = function() {
                        if (!$scope.item.month) {
                            utils.message('月份不能为空!');
                            return;
                        }
                        incomeExpensesDetail.get(1, {month: $scope.item.month}).success(function ( res ) {
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
                            controller:   [  "$scope", "$rootScope", "$modalInstance", "item", "$state", "$sce", "incomeExpensesDetail", "utils", function($scope, $rootScope, $modalInstance, item, $state, $sce , incomeExpensesDetail, utils ){
                                $scope.msg = '确定要封' + item.month + '的账， 封账之后的数据不可变动';
                                $scope.ok = function() {
                                    $scope.msg = '正在封账';
                                    incomeExpensesDetail.seal({month : item.month, type : 3}).success(function ( res ) {
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
                templateUrl: "tpl-view-seal.html",
                resolve: {
                    item: function () {
                        return item;
                    }
                },
                size: 'lg',
                controller: ["$scope", "$rootScope", "$modalInstance", "item", "$state", "$sce", "incomeExpensesDetail", "utils", function ($scope, $rootScope, $modalInstance, item, $state, $sce, incomeExpensesDetail, utils) {
                    $scope.item = {};
                    $scope.view = function () {
                        incomeExpensesDetail.viewSealInfo({month: $scope.item.month, type: 3}).success(function (res) {
                            if (res.code == 0) {
                                $scope.list = res.data ? res.data.list : {};
                                $scope.item = res.data ? angular.extend({}, $scope.item, res.data) : $scope.item;
                            } else {
                                angular.message(res.msg);
                            }
                        }).error(function () {
                            angular.message('服务器无响应！');
                        })
                    }
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    }
                }]

            });
        }    
    }
])


