/**
 * Created by DTO on 2015/4/27.
 * ?
 */
angular.module('settlement.statement.getStatementList', [
    'settlement.statement.getStatementList.service',
    'utils.service'
])
    .controller('controller.settlement.statement.getStatementList',
    ["$scope", "$rootScope", "$stateParams", "$modal", "$state",  "statementList" , "utils",
        function ($scope, $rootScope, $stateParams, $modal, $state,  statementList, utils) {

            $scope.statementList = statementList;
            $scope.utils = utils;
            $scope.refund = function(){
                if (confirm("是否要退款？")){

                }
            }

       /*     $scope.edit = function () {
                $scope.addModal(null, this.item);
            }*/


            $scope.messageModal = function(){

            }

            $scope.confirm = function(){
                var item = this.item;
                $modal.open({
                    templateUrl: "tpl-confirm.html" ,
                    resolve: {
                        item: function () {
                            return item;
                        }
                    },
                    size:  'md',
                    controller:   [  "$scope", "$rootScope", "$modalInstance", "item", "$state", "$filter","statementList" ,function(
                        $scope, $rootScope, $modalInstance, item, $state ,$filter, statementList
                    ){

                        $scope.dateTime = $filter('date')( new Date() , 'yyyyMMdd')
                        $scope.update = function(){
                            $modalInstance.dismiss('cancel');
                        }
                        $scope.item = item;
                        $scope.ok = function(){
                            statementList.select({ channel : item.channel, date : item.settlement_date , merchant_id : item.merchant_id, confirm_date : $scope.dateTime }).success(function(res){
                                if(res.code == 0){
                                    $modalInstance.dismiss('cancel');
                                    $state.reload();
                                } else {
                                    $modalInstance.dismiss('cancel');
                                    alert(res.msg);
                                }
                            })
                        }
                        $scope.cancel = function(){
                            $modalInstance.dismiss('cancel');
                            //$state.reload();
                        }
                    }]
                });
            }
            $scope.detail = function(){
                $state.go('settlement-statement-detail',{ merchant_id : this.item.merchant_id, channel : this.item.channel, settlement_date: this.item.settlement_date });
            }
        }])

