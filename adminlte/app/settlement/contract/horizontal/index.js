angular.module('settlement.contract.horizontal', [
    'settlement.contract.horizontal.service',
    'utils.service'
])
    .controller('controller.settlement.contract.horizontal',
    ["$scope", "$rootScope", "$stateParams", "$modal", "$state",  "horizontal" ,"utils","fileupload",
        function ($scope, $rootScope, $stateParams, $modal, $state,  horizontal , utils , fileupload ) {

            horizontal.get($stateParams.order_no).success(function(res){
                if (res.code == 0) {
                    $scope.item = res.data;
                    $scope.certificate_pic = $scope.item.certificate_pic ;
                    $scope.contract_pic =  $scope.item.contract_pic ;
                    $scope.showBig();
                }
                else {
                    utils.message(res.msg);
                }
            }).error(function () {
                utils.message('读取失败！');
            })


            $scope.refund = function(){
                if (confirm("是否要退款？")){

                }
            }

            /*     $scope.edit = function () {
             $scope.addModal(null, this.item);
             }*/


            $scope.messageModal = function(){

            }
            $scope.showBig = function(url){
                //console.log($scope.certificate_pic[0].replace(/_[0-9]+\-[0-9]+[a-z]_/,'_0-0_'))
                if($scope.item.certificate_pic){
                    $scope.src = (url || $scope.item.certificate_pic[0].url).replace(/_[0-9]+\-[0-9]+[a-z]_/,'_0-0_');
                }else if($scope.item.contract_pic){
                    $scope.src = (url || $scope.item.contract_pic[0].url).replace(/_[0-9]+\-[0-9]+[a-z]_/,'_0-0_');
                }else{
                    $scope.src = url.replace(/_[0-9]+\-[0-9]+[a-z]_/,'_0-0_') || "";
                }

                //$scope.src = src || $scope.certificate_pic[0];
            }


            $scope.check = function(res){
                var item = this.item;
                if(res == 0){
                    $modal.open({
                        templateUrl: "tpl-yes.html" ,
                        resolve: {
                            item: function () {
                                return item;
                            },
                            check_note : function(){
                                return  $scope.check_note;
                            }
                        },
                        size:  'sm',
                        controller:   [  "$scope", "$rootScope", "$modalInstance", "item", "$state", "$filter","horizontal" , "check_note",function(
                            $scope, $rootScope, $modalInstance, item, $state ,$filter, horizontal , check_note
                        ){
                            $scope.update = function(){
                                $modalInstance.dismiss('cancel');
                            }
                            $scope.ok = function(){
                                horizontal.select({ check_note : check_note, order_no : item.order_no, check: "yes" }).success(function(res){
                                    $state.go('settlement-contract-contractList');
                                    $modalInstance.dismiss('cancel');
                                    //$state.reload();
                                })
                            }
                            $scope.cancel = function(){
                                $modalInstance.dismiss('cancel');
                                //$state.reload();
                            }
                        }]
                    });
                }
                else if(res == 1){
                    $modal.open({
                        templateUrl: "tpl-no.html" ,
                        resolve: {
                            item: function () {
                                return item;
                            },
                            check_note : function(){
                                return  $scope.check_note;
                            }
                        },
                        size:  'sm',
                        controller:   [  "$scope", "$rootScope", "$modalInstance", "item", "$state", "$filter","horizontal" ,"check_note",function(
                            $scope, $rootScope, $modalInstance, item, $state ,$filter, horizontal,check_note
                        ){
                            $scope.update = function(){
                                $modalInstance.dismiss('cancel');
                            }
                            $scope.ok = function(){
                                horizontal.select({ check_note : check_note, order_no : item.order_no, check: "no" }).success(function(res){
                                    if(res.code == 0) {
                                        $state.go('settlement-contract-contractList');
                                        $modalInstance.dismiss('cancel');
                                        //$state.reload();
                                    }else{
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
            }
            $scope.quit = function(){
                $state.go('settlement-contract-contractList');
            }
        }])

