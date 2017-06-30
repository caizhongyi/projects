/**
 * Created by Administrator on 2015/7/29.
 */
angular.module('chefubao.simulation.request.payNotice', ["chefubao.simulation.request.service"])
    .controller('controller.chefubao.simulation.request.payNotice',
    ["$scope", "$rootScope", "$stateParams", "$modal", "$state", "request", "$filter", "$cookieStore","$timeout", "utils",
        function ($scope, $rootScope, $stateParams, $modal, $state, request,  $filter, $cookieStore , $timeout , utils ) {
            request.getTestEnvData().success(function (res) {
                $scope.item = res.data;
                $scope.item.type = 1;
            })

            $scope.submitted = false;
            $scope.interacted = function( field ){
                return  (utils.browser().msie ? (field.$dirty && $scope.submitted) : (field.$dirty || $scope.submitted)) || field.isblur;
            }

            $scope.$watch('item.key' , function( val ){
                 $scope.hasKey = !val;
            })
            $scope.item.key = '';
            $scope.submit = function( isValid ){
                $now = new Date();
                $scope.item.time = $now.getTime();
                $scope.item.key = $scope.item.key ? $.md5($scope.item.key + $scope.item.order_no + $scope.item.time) : '';

                $scope.res = '';
                $scope.submitted = true;
                if( isValid ){
                    if ($scope.item.rollback == 2) {

                        request.payRollbak( $scope.item ).success(function (res) {
                            if (res.code == 0) {
                                utils.message( 'success rollback' ) ;
                            } else {
                                utils.message( res.msg || res.message ) ;
                            }
                        })
                    } else {
                        request.payNotice( $scope.item ).success(function ( res ) {
                            $scope.submitted = false;
                            $timeout(function(){
                                if (res.code == 0) {
                                    $scope.res = res;
                                } else {
                                    utils.message( res.msg || res.message ) ;
                                }
                            })
                        }).error(function () {
                            utils.message('搜索失败！');
                        })
                    }
                }
            }
        }])