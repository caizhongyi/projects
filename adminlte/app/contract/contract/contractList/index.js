angular.module('contract.contract.contractList', [
    'contract.contract.contractList.service', 'contract.utils.service'])
    .controller('controller.contract.contract.contractList',
    ["$scope", "$rootScope", "$stateParams", "$modal", "$state",  "jhccontract" , "utils",
        function ($scope, $rootScope, $stateParams, $modal, $state,  jhccontract , utils) {

            $scope.utils = utils;
            $scope.jhccontract = jhccontract ;
            $scope.printAgain = function(){
                $state.go('contract-contract-printShow',{ id : this.item.id });
            }
            $scope.reAdd = function(){
                if(confirm("确认重新生成该合同？")){
                    jhccontract.reAdd(this.item.id).success(function ( res ) {
                        if (res.code == 0) {
                            utils.message(res.msg);
                            $state.go('contract-contract-contractList',{ currentPage : 1 }, {reload:true});
                        } else {
                            utils.message(res.msg);
                        }
                    }).error(function () {
                        utils.message('服务器无响应！');
                    })
                };
            }

            $scope.del = function(){
                if(confirm("确认删除草稿？")){
                    jhccontract.del(this.item.id).success(function ( res ) {
                        if (res.code == 0) {
                            utils.message(res.msg);
                            $state.go('contract-contract-contractList',{ currentPage : 1 }, {reload:true});
                        } else {
                            utils.message(res.msg);
                        }
                    }).error(function () {
                        utils.message('服务器无响应！');
                    })
                };
            }
            $scope.contractInfo = function(){
                $state.go('settlement-contract-getContractByOrderNo',{ order_no : this.item.order_no });
            }

            $scope.edit = function(){
                $state.go('contract-contract-addContract',{ id : this.item.id  });
            }

            $scope.downloadForm = function(){
                jhccontract.excel($scope.searchCondition);
            }
        }])
