/**
 * Created by DTO on 2015/4/27.
 * ?
 */
angular.module('chefubao.simulation.request', ["chefubao.simulation.request.service"])
    .controller('controller.chefubao.simulation.request',
    ["$scope", "$rootScope", "$stateParams", "$modal", "$state", "request", "$filter", "$cookieStore","$timeout", "utils",
        function ($scope, $rootScope, $stateParams, $modal, $state, request,  $filter, $cookieStore , $timeout , utils ) {
            $scope.goto = function( name ){
                $scope.item = $scope.item || {};
                $state.go('chefubao-simulation-request.' + name ) ;
            }
            $scope.goto('getOrderInfo');
        }])
