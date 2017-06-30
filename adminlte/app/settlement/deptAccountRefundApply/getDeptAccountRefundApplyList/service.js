/**
 * @ngdoc service
 * @name 
 * @description
 * _Please update the description and dependencies._
 *
 * */
angular.module('settlement.deptAccountRefundApply.getDeptAccountRefundApplyList.service',[])
    .service('refundApply', [ "$http" , "MBS_DOMAIN" ,function( $http , MBS_DOMAIN ){
        //门店退款申请/审核列表
        this.get = function( paginationInfo , params ) {
            return $http.post( MBS_DOMAIN + '/Settlement/DeptAccountRefundApply/getDeptAccountRefundApplyList/'+ paginationInfo.currentPage +'/'+ paginationInfo.pageSize , params )
        }

        //审核门店退款账户
        this.checkDeptAccountRefundApply = function( item ){
            return $http.post(MBS_DOMAIN + '/Settlement/DeptAccountRefundApply/checkDeptAccountRefundApply/' , item);
        }

        this.payDeptAccountRefund = function( item ){
            return $http.post(MBS_DOMAIN + '/Settlement/DeptAccountRefundApply/payDeptAccountRefund/' , item);
        }

}])

