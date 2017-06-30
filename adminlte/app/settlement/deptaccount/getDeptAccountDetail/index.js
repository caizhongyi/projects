/**
 * Created by DTO on 2015/4/27.
 * ?
 */
angular.module('settlement.deptAccount.getDeptAccountDetail',    [
    'settlement.deptAccount.getDeptAccountDetail.service',
    "settlement.utils.service", "settlement.utils.directive"
])
.controller('controller.settlement.deptAccount.getDeptAccountDetail',
["$scope", "$rootScope", "$stateParams", "$modal", "$state",  "getDeptAccountDetail" ,
    function ($scope, $rootScope, $stateParams, $modal, $state,  getDeptAccountDetail ) {

        $scope.reportDeptDetail = getDeptAccountDetail ;

            $scope.$on('seniorTableLoaded', function( e ,res ){
                var items = res.data.list;

                $scope.item.fee1_total = 0 ;
                $scope.item.fee2_total = 0 ;
                $scope.item.balance_total = 0 ;

                if(!$scope.searchCondition.start_date){
					$scope.searchCondition.start_date = res.data.default_start_date;
				}
				if(!$scope.searchCondition.end_date){
					$scope.searchCondition.end_date = res.data.default_end_date;
				}

                items.forEach(function( n , i ){
                    n.infee = n.fee < 0 ? 0 :  Math.abs(n.fee) ;
                    n.outfee = n.fee > 0 ? 0 :   Math.abs(n.fee) ;
                    $scope.item.fee1_total += n.infee ;
                    $scope.item.fee2_total += n.outfee  ;
                })
				if(items.length >0 ){
					items.unshift({
						sumFee : res.data.pre_fee ,
						pre_fee : res.data.pre_fee
					})
				}
        })
        }])


