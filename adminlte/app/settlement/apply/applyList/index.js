/**
 * Created by DTO on 2015/4/27.
 * ?
 */
angular.module('settlement.apply.applyList', [
    'settlement.apply.applyList.service',
    'settlement.utils.service'
])
    .controller('controller.settlement.apply.applyList',
    ["$scope", "$rootScope", "$stateParams", "$modal", "$state", "$timeout", "applyList" , "utils", 
        function ($scope, $rootScope, $stateParams, $modal, $state, $timeout, applyList, utils) {

            $scope.applyList = applyList;
            $scope.utils = utils;

            $scope.preview = function(){
                $state.go('settlement-apply-applyInfo' , { id : this.item.id  , preview : true });
            }

            $scope.audit = function(){
                $state.go('settlement-apply-applyInfo' , { id : this.item.id  });
            }

            $scope.view = function(){
                $modal.open({
                    templateUrl: "tpl-message.html" ,
                    resolve: {
                        item: function () {
                            return $scope.item;
                        }
                    },
                    size:  'md',
                    controller:   [  "$scope", "$rootScope", "$modalInstance", "item", "$state",  function(
                        $scope, $rootScope, $modalInstance, item, $state
                    ){
                        $scope.ok = function(){
                            $modalInstance.dismiss('cancel');
                        }
                        $scope.cancel = function(){
                            item.repeat_order = true;
                            applyList.add( item ).success(function( res ){
                                $modalInstance.dismiss('cancel');
                            })
                        }
                    }]
                });

            }

            $scope.reject = function(){
                var item = this.item;
                $modal.open({
                    templateUrl: "tpl-reject.html",
                    resolve: {
                        item: function () {
                            return item;
                        }
                    },
                    size: 'md',
                    controller: ["$scope", "$rootScope", "$modalInstance", "item", "$state", "$filter", "applyList" ,
                        function ($scope, $rootScope, $modalInstance, item, $state, $filter, applyList) {

                        $scope.submittedEdit = false;
                        $scope.interacted = function( field ){
                            return  (field.$dirty && $scope.submittedEdit) || field.isblur;
                        }
                        $scope.rejectSubmitAddForm = function ( isValid ) {
                            $scope.check_error = ""
                            $scope.submittedEdit = true;
                            if( isValid ){
                                applyList.reject({ id: item.id, type:'no', pay_check_note: $scope.reject_check_note }).success(function (res) {
                                    $scope.isError = false;
                                    if(res.code == 0){
                                        $modalInstance.dismiss('cancel');
                                        $state.reload();
                                    }else{
                                        $scope.check_error = res.msg;
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

            $scope.return = function() {
                var item = this.item;
                $modal.open({
                    templateUrl: "tpl-return.html",
                    resolve: {
                        item: function () {
                            return item;
                        }
                    },
                    size: 'md',
                    controller: ["$scope", "$rootScope", "$modalInstance", "item", "$state", "$filter", "applyList" ,
                        function ($scope, $rootScope, $modalInstance, item, $state, $filter, applyList) {
                        $scope.update = function () {
                            $modalInstance.dismiss('cancel');
                        }
                        $scope.submittedEdit = false;
                        $scope.interacted = function( field ){
                            return  (field.$dirty && $scope.submittedEdit) || field.isblur;
                        }
                        $scope.submitAddForm = function ( isValid ) {
                            $scope.check_error = ""
                            $scope.submittedEdit = true;
                            if( isValid ){
                                applyList.select({check_note: $scope.check_note, order_no: item.order_no}).success(function (res) {
                                    $scope.isError = false;
                                    if(res.code == 0){
                                        $modalInstance.dismiss('cancel');
                                        $state.reload();
                                    }else{
                                        $scope.check_error = res.msg;
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
        }])

