/**
 * Created by zhengby on 2015/12/11.
 * ?
 */
angular.module('basicservice.ShortUrl.index', [
    'basicservice.ShortUrl.index.service'
])
    .controller('controller.basicservice.ShortUrl.index',
    ["$scope", "$rootScope", "$stateParams", "$modal", "$state",  "shorturl" , "utils", "$timeout", "security", "$location",
        function ($scope, $rootScope, $stateParams, $modal, $state,  shorturl , utils , timeout , security , $location) {

            //模型对象
            $scope.shorturl = shorturl;
            $scope.utils = utils;

            shorturl.getApp().success(function( res ){

                if (res.code == 0) {
                   $scope.appcodeList = res.data;
                } else {
                    utils.message(res.msg);
                }
            })
            var modals = {
                openSuccess : function( scope , data ){
                    $modal.open({
                        templateUrl: "tpl-success.html" ,
                        resolve: {
                            item: function () {
                                return $scope.item;
                            }
                        },
                        size:  'sd',
                        controller:   [  "$scope", "$rootScope", "$modalInstance", "item", "$state",  function(
                            $scope, $rootScope, $modalInstance, item, $state
                        ){
                            $scope.item = data.data;
                            $scope.ok = function(){
                                scope.item = data.data;
                                scope.update();
                                $modalInstance.dismiss('cancel');
                                $state.reload();
                            }
                            $scope.cancel = function(){
                                $modalInstance.dismiss('cancel');
                                $state.reload();
                            }
                        }]
                    });
                },
                openMessage : function( scope ,data ,instance ){
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
                            $scope.update = function(){
                                $modalInstance.dismiss('cancel');
                            }

                            $scope.ok = function(){
                                var d =  data.data;
                                d.repeat_order = true;
                                shorturl.add( d ).success(function( res ){
                                    $modalInstance.dismiss('cancel');
                                    instance.dismiss('cancel');
                                    modals.openSuccess( scope , res )
                                })
                            }

                            $scope.goToList = function(){
                                $modalInstance.dismiss('cancel');
                                $state.go('shorturl-order-aaa' , { car_number :  $scope.item.car_number } );
                            }

                            $scope.cancel = function(){
                                $modalInstance.dismiss('cancel');
                                instance.dismiss('cancel');
                            }
                        }]
                    });
                }
            }

            $scope.$on('modalAddWarning' , function( e, $scope ,data , $modalInstance){
                modals.openMessage( $scope,data , $modalInstance )
            });

            $scope.$on('modalAddSuccess' , function( e, $scope ,data ){
                modals.openSuccess( $scope ,data )
            });

            $scope.urladd = function(){


           /*     shorturl.getApp().success(function( res ){

                    if (res.code == 0) {
                        $scope.appcodeList = res.data;
                    } else {
                        utils.message(res.msg);
                    }
                })*/

               // console.log( $scope.appcodeList);
                var item = this.item;
                shorturl.del(item).success(function(res){
                    $modal.open({
                        templateUrl: "tpl-urladd.html" ,
                        resolve: {
                            res: function () {
                                return res;
                            },
                            appcodeList: function () {
                                return $scope.appcodeList;
                            },
                        },
                        size:  'md',
                        controller:   [  "$scope", "$rootScope", "$modalInstance", "res", "$state", "shorturl" ,"appcodeList" ,function(
                            $scope, $rootScope, $modalInstance, res, $state,shorturl,appcodeList
                        ){
                            $scope.res = res;
                            $scope.appcodeList = appcodeList;
                            $scope.cancel = function(){
                                $modalInstance.dismiss('cancel');
                                $state.reload();
                            }
                            $scope.submitted = false;
                            $scope.interacted = function (field) {
                                return field.$dirty || $scope.submitted || field.isblur;
                            }
                            $scope.urladd = function(){

                                $scope.submitAddForm = function (isValid) {
                                   // isValid = addurlForm.$valid;

                                    $scope.submitted = true;
                                    if (!isValid) {
                                        console.log(isValid);
                                        // utils.message("验证失败!");
                                    } else {
                                        shorturl.urladd($scope.item).success(function( res ){
                                            if (res.code == 0) {
                                                $modalInstance.dismiss('cancel');
                                                utils.message('新增成功!');
                                                $state.reload();
                                            }
                                            else {
                                                utils.message(res.msg);
                                            }
                                        })
                                    }
                                }




                            }
                        }]
                    });
                });
            }

            $scope.finish = function(){
                var item = this.item;
                shorturl.del(item).success(function(res){
                    $modal.open({
                        templateUrl: "tpl-finish.html" ,
                        resolve: {
                            res: function () {
                                return res;
                            }
                        },
                        size:  'md',
                        controller:   [  "$scope", "$rootScope", "$modalInstance", "res", "$state",  function(
                            $scope, $rootScope, $modalInstance, res, $state
                        ){
                            $scope.res = res;
                            $scope.cancel = function(){
                                $modalInstance.dismiss('cancel');
                                $state.reload();
                            }
                        }]
                    });
                });
            }

        }])



