/**
 * Created by Administrator on 2015/7/29.
 */
angular.module('chefubao.simulation.request.getOrderInfo', ["chefubao.simulation.request.service"])
    .controller('controller.chefubao.simulation.request.getOrderInfo',
    ["$scope", "$rootScope", "$stateParams", "$modal", "$state", "request", "$filter", "$cookieStore","$timeout", "utils",
        function ($scope, $rootScope, $stateParams, $modal, $state, request,  $filter, $cookieStore , $timeout , utils ) {
            $scope.item.type = 1;
            $scope.submitted = false;
            $scope.interacted = function( field ){
                return  (utils.browser().msie ? (field.$dirty && $scope.submitted) : (field.$dirty || $scope.submitted)) || field.isblur;
            }

            $scope.submit = function( isValid ){
                $scope.res = '';
                $scope.submitted = true;
                if( isValid ){
                    request.getOrderInfo( $scope.item ).success(function ( res ) {
                        $timeout(function(){
                            if (res.code == 0) {
                                $scope.res = res.data;
                                if (!res.data.ORDER_NO) {
                                    utils.message( '没有该订单信息') ;
                                }
                            } else {
                                utils.message( res.msg || res.message ) ;
                            }
                        })
                    }).error(function () {
                        utils.message('搜索失败！');
                    })
                }
            }
        }])