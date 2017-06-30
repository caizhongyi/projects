/**
 * Created by DTO on 2015/4/27.
 * ?
 */
angular.module('settlement.deptAccount.updateDeptAccount', [
    "settlement.deptAccount.updateDeptAccount.service",
    "settlement.utils.service", "settlement.utils.directive"
    ])
    .controller('controller.settlement.deptAccount.updateDeptAccount',
    ["$scope", "$rootScope", "$stateParams", "$modal", "$state", "$filter", "$cookieStore", "updAccount", "$timeout", "utils",
        function ($scope, $rootScope, $stateParams, $modal, $state,$filter, $cookieStore , updAccount , $timeout , utils ) {
            $scope.item = {};

            function watchSync( name ){
                $scope.$watch('item.' + name , function(){
                    if( $scope.sync ) {
                        if (name == "payee_bank_card_number") {
                            $scope.item["c_payee_card_number"] = $scope.item["payee_bank_card_number"];
                        }
                        else if(name == "linkman"){
                            $scope.item["company_name"] =  $scope.item["linkman"];
                        }
                        else {
                            $scope.item['c_' + name] = $scope.item[name];
                        }
                    }
                  /*  var isSame = same();
                    if( isSame  !=  $scope.sync){
                        $scope.sync = isSame;
                    }*/
                })
            }

            var syncArray = ["linkman","payee_realname","payee_idcard" , "payee_bank_branch" ,"payee_bank_card_number" ,"payee_bank"];
            //var syncArrayC = ["c_payee_realname","c_payee_idcard" , "c_payee_bank_branch" ,"c_payee_card_number" ,"c_payee_bank"];

          /*  syncArrayC.forEach(function( n ){
                watchSync( n );
            })*/

            var same = function(){
                var bool = true;
                syncArray.forEach(function( n ){
                    if( n == "payee_bank_card_number" ){
                        if( $scope.item["c_payee_card_number"]  !=  $scope.item["payee_bank_card_number"]){
                            bool = false;
                            return bool;
                        }
                    }
                    else if(n == "linkman"){
                        $scope.item["company_name"] !=  $scope.item["linkman"];
                        bool = false;
                        return bool;
                    }
                    else{
                        if( $scope.item["c_" + n ]  !=  $scope.item[ n ]){
                            bool = false;
                            return bool;
                        }
                    }

                })
                return bool;
            }


            $scope.$watch('sync', function( val ){
                $scope.item =  $scope.item || {};
                if( $scope.sync ){
                    syncArray.forEach(function( n ){
                        if( n  == "payee_bank_card_number" ){
                            $scope.item["c_payee_card_number"] =  $scope.item["payee_bank_card_number"];
                        }
                        else if(n == "linkman"){
                            $scope.item["company_name"] =  $scope.item["linkman"];
                        }
                        else{
                            $scope.item['c_' + n] =  $scope.item[n];
                        }
                    })
                    $scope.syncDisabled = true;
                }
                else{
                    syncArray.forEach(function( n ){
                        if( n == "payee_bank_card_number" ){
                            $scope.item["c_payee_card_number"] = '';
                        }
                        else if(n == "linkman"){
                            $scope.item["company_name"] = '';
                        }
                        else{
                            $scope.item["c_" + n ]  = '';
                        }
                    })
                    $scope.syncDisabled = false;
                }
            })


            if( $stateParams.id )
                updAccount.get( $stateParams.id ).success(function( res ){
                     $scope.item = res.data;
                     if(same()) $scope.sync = true;

                })


                $scope.submitted = false;
                $scope.interacted = function( field ){
                    return field.$dirty || $scope.submitted || field.isblur;
                }
                $scope.submit = function( isValid ){
                    var item = angular.extend({},$scope.item);
                    delete item.balance ;

                    $scope.submitted = true;

                    if( $stateParams.id ){
                        if (!isValid) {
                            //  utils.message("验证失败!");
                        }
                        else{
                            updAccount.update( item ).success(function( res ){
                                $timeout(function(){
                                    if (res.code == 0) {
                                        utils.message(res.msg || '保存成功！');
                                        $state.go('settlement-deptAccount-getDeptAccountList');
                                    }
                                    else {
                                        utils.message(res.msg);
                                    }
                                })
                            }).error(function () {
                                utils.message('服务器访问失败！');
                            })
                        }
                    }
                    else{
                        if (!isValid) {
                            //  utils.message("验证失败!");
                        }
                        else{
                            updAccount.add( item ).success(function( res ){
                                $timeout(function() {
                                    if (res.code == 0) {
                                        utils.message(res.msg || '保存成功！');
                                        $state.go('settlement-deptAccount-getDeptAccountList');
                                    }
                                    else {
                                        utils.message(res.msg);
                                    }
                                })
                            }).error(function () {
                                utils.message('服务器访问失败！');
                            })
                        }

                    }

                }

                $scope.back = function(){
                    $state.go('settlement-deptAccount-getDeptAccountList');
                }
            }])

