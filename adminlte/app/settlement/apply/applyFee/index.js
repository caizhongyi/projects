/**
 * Created by DTO on 2015/4/27.
 * ?
 */
angular.module('settlement.apply.applyFee', ["settlement.apply.applyFee.service"])
    .controller('controller.settlement.apply.applyFee',
    ["$scope", "$rootScope", "$stateParams", "$modal", "$state", "applyFee", "$filter", "$cookieStore","$timeout", "utils",
        function ($scope, $rootScope, $stateParams, $modal, $state, applyFee,  $filter, $cookieStore , $timeout , utils ) {
            applyFee.get( $stateParams ).success(function( res ){
                if (res.code == 0) {
                    $scope.item = res.data;
                    $scope.item.fee_type = 1;

                    applyFee.applyCarFee( $scope.item ).success(function(res){
                        if (res.data.notice_code == 1001 || res.data.notice_code == 1002) {
                            $modal.open({
                                templateUrl: "tpl-notice.html" ,
                                resolve: {
                                    item: function () {
                                        return $scope.item;
                                    },
                                    res: function () {
                                        // console.log(res);
                                        return res;
                                    }
                                },
                                backdrop : 'static',
                                size:  'md',
                                controller:   [  "$scope", "$rootScope", "$modalInstance", "item", "res", "$state", "$location",  function(
                                    $scope, $rootScope, $modalInstance, item, res, $state , $location
                                ){
                                    $scope.res = res;
                                    $scope.cancel = function(){
                                        $modalInstance.dismiss('cancel');
                                        if (res.data.notice_code != 1001) {
                                            $state.go ('settlement-order-orderList', { order_no : item.order_no } );
                                        }
                                    }
                                }]
                            });
                        } else {

                        }})
                }
                else {
                    utils.message(res.msg);
                }

            })
                .error(function () {})



            $scope.goto = function( name ){
                $scope.item = $scope.item || {};
                $state.go('settlement-apply-applyFee.' + name ,  { fee_type : $scope.item.fee_type } ) ;
            }
            $scope.goto('carfeeapply');

            $scope.sendCode = function(type){
                applyFee.sendCodeApply( type, $scope.item.order_no ).success(function(res){
                    utils.message(res.msg);
                }).error(function(){
                    utils.message('发送失败，稍后重试！');
                })
            };

        }])
    .config(["$stateProvider", "$urlRouterProvider", "$httpProvider", "$ocLazyLoadProvider", "routeProvider",
    function ($stateProvider, $urlRouterProvider, $httpProvider, $ocLazyLoadProvider, routeProvider) {
        routeProvider.stateSub( 'settlement-apply-applyFee.carfeeapply', {
            page: { title: '支付车款' },
            files : ["app/settlement/apply/applyFee/carfeeapply.js"],
            controller: 'controller.settlement.apply.applyFee.carfeeapply',
            query: "/:fee_type"
        });
        routeProvider.stateSub( 'settlement-apply-applyFee.brokerageapply', {
            page: { title: '申请信息服务费' },
            files : ["app/settlement/apply/applyFee/brokerageapply.js"],
            controller: 'controller.settlement.apply.applyFee.brokerageapply',
            query: "/:fee_type"
        });
        routeProvider.stateSub( 'settlement-apply-applyFee.cartootherapply', {
            page: { title: '车款专其他' },
            files : ["app/settlement/apply/applyFee/cartootherapply.js"],
            controller: 'controller.settlement.apply.applyFee.cartootherapply',
            query: "/:fee_type"
        });
        routeProvider.stateSub( 'settlement-apply-applyFee.servicefeeapply', {
            page: { title: '申请服务费' },
            files : ["app/settlement/apply/applyFee/servicefeeapply.js"],
            controller: 'controller.settlement.apply.applyFee.servicefeeapply',
            query: "/:fee_type"
        });
        routeProvider.stateSub( 'settlement-apply-applyFee.jhcservicefeeapply', {
            page: { title: '巨好车信息服务费' },
            files : ["app/settlement/apply/applyFee/jhcservicefeeapply.js"],
            controller: 'controller.settlement.apply.applyFee.jhcservicefeeapply',
            query: "/:fee_type"
        });
    }])