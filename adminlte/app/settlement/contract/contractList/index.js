angular.module('settlement.contract.contractList', [
    'settlement.contract.contractList.service',
    'settlement.utils.service'
])
    .controller('controller.settlement.contract.contractList',
    ["$scope", "$rootScope", "$stateParams", "$modal", "$state",  "contract" , "utils",
        function ($scope, $rootScope, $stateParams, $modal, $state,  contract , utils) {

            $scope.contract = contract ;
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
            $scope.contractInfo = function(){
                $state.go('settlement-contract-getContractByOrderNo',{ order_no : this.item.order_no });
            }
            $scope.complete = function(){
                $state.go('settlement-contract-addContract',{ order_no : this.item.order_no });
            }
            $scope.check = function(){
                $state.go('settlement-contract-horizontal',{ order_no : this.item.order_no });
            }
            $scope.return = function() {
                var item = this.item;
                $modal.open({
                    templateUrl: "tpl-return.html",
                    resolve: {
                        item: function () {
                            return item;
                        }
                        //check_note: function(){
                        //    return $scope.check_note;
                        //}
                    },
                    size: 'md',
                    controller: ["$scope", "$rootScope", "$modalInstance", "item", "$state", "$filter", "contract",
                        function ($scope, $rootScope, $modalInstance, item, $state, $filter, contract) {
                        $scope.update = function () {
                            $modalInstance.dismiss('cancel');
                        }
                        $scope.submittedEdit = false;
                        $scope.interacted = function( field ){
                            return  (utils.browser().msie ? (field.$dirty && $scope.submittedEdit) : (field.$dirty || $scope.submittedEdit))  || field.isblur;
                        }
                        $scope.submitAddForm = function ( isValid ) {
                            $scope.check_error = ""
                            $scope.submittedEdit = true;
                            if( isValid ){
                                contract.select({check_note: $scope.check_note, order_no: item.order_no}).success(function (res) {
                                    $scope.isError = false;
                                    if(res.code == 0){
                                        //$state.go('settlement-contract-contractList');
                                        $modalInstance.dismiss('cancel');
                                        $state.reload();
                                    }else{
                                        $scope.check_error = res.msg;
                                        //$scope.isError = true;
                                        //$modalInstance.dismiss('cancel');
                                    }
                                })
                            }
                        }
                        $scope.cancel = function () {
                            $modalInstance.dismiss('cancel');
                            //$state.reload();
                        }
                    }]
                });
            }
            //$scope.edit = function(){
            //    $state.go('settlement-contract-step1',{ order_no : this.item.order_no });
            //}
        }])
    .config(["$stateProvider", function ($stateProvider) {
          /*  angular.uiRouteSubState.call($stateProvider, 'settlement-contract-detail', {
                page: {title: '合同详情'},
                query: "/:currentPage?start_date&end_date&entry_user&car_number&contract_no"
            });*/
        /*   angular.uiRouteSubState.call($stateProvider, 'settlement-contract-edit', {
                page: {title: '完善合同'},
                query: "/:currentPage?start_date&end_date&entry_user&car_number&contract_no"
            });
            angular.uiRouteSubState.call($stateProvider, 'settlement-contract-horizontal', {
                page: {title: '合同审核'},
                query: "/:currentPage?start_date&end_date&entry_user&car_number&contract_no"
            });
            angular.uiRouteSubState.call($stateProvider, 'settlement-contract-update', {
                page: {title: '已完善合同'},
                query: "/:currentPage?start_date&end_date&entry_user&car_number&contract_no"
            });
            angular.uiRouteSubState.call($stateProvider, 'settlement-contract-vertical', {
                page: {title: '合同审核'},
                query: "/:currentPage?start_date&end_date&entry_user&car_number&contract_no"
            });
            angular.uiRouteSubState.call($stateProvider, 'settlement-contract-step1', {
                page: {title: '完善合同'},
                query: "/:currentPage?start_date&end_date&entry_user&car_number&contract_no"
            });
            angular.uiRouteSubState.call($stateProvider, 'settlement-contract-step2', {
                page: {title: '完善合同'},
                query: "/:currentPage?start_date&end_date&entry_user&car_number&contract_no"
            });
            angular.uiRouteSubState.call($stateProvider, 'settlement-contract-step3', {
                page: {title: '完善合同'},
                query: "/:currentPage?start_date&end_date&entry_user&car_number&contract_no"
            });
            angular.uiRouteSubState.call($stateProvider, 'settlement-contract-step4', {
                page: {title: '完善合同'},
                query: "/:currentPage?start_date&end_date&entry_user&car_number&contract_no"
            });*/
        }])
