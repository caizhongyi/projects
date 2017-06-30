/**
 * @ngdoc service
 * @name 
 * @description
 * _Please update the description and dependencies._
 *
 * */
angular.module('settlement.deptAccount.getDeptAccountList.service',[])
    .service('deptAccount', [ "$http" , "MBS_DOMAIN" ,function( $http , MBS_DOMAIN ){
        this.get = function( paginationInfo , params ) {
            return $http.post( MBS_DOMAIN + '/Settlement/DeptAccount/getDeptAccountList/'+ paginationInfo.currentPage +'/'+ paginationInfo.pageSize , params )
        }

        this.getDeptInfoByDeptId = function( id ) {
            return $http.get( MBS_DOMAIN + '/Settlement/DeptAccount/getDeptInfoByDeptId/'+ id)
        }

        this.addDeptAccountDepositApply = function( item ) {
            return $http.post( MBS_DOMAIN + '/Settlement/DeptAccountDepositApply/addDeptAccountDepositApply/' , item )
        }

        //新建门店退款申请
        this.addDeptAccountRefundApply = function( item ){
            return $http.post(MBS_DOMAIN + '/Settlement/DeptAccountRefundApply/addDeptAccountRefundApply/' , item);
        }

      /*  // 门店退款根据id获取申请/审核信息
        this.addDeptAccountRefundApply = function( item ){
            return $http.post(MBS_DOMAIN + '/Settlement/DeptAccountRefundApply/addDeptAccountRefundApply/' , item);
        }*/

  /*      http://mbs.273.cn/Settlement/DeptAccountDepositApply/checkDeptAccountDepositApply/
            审核门店付款账户
        http://mbs.273.cn/Settlement/DeptAccountDepositApply/getDeptAccountDepositApplyList/
            申请/审核列表

        http://mbs.273.cn/Settlement/DeptAccountDepositApply/getDeptAccountDepositApplyById/
            根据id获取申请/审核信息*/

        /**
         * 暂停/启动
         * status 1
        * */
        this.setDeptAccountStatus = function( item ){
            return $http.post(MBS_DOMAIN + '/Settlement/DeptAccount/setDeptAccountStatus/' , item);
        }

        //发送短信通知转账
        this.noticeTransfer = function( item ){
            return $http.post(MBS_DOMAIN + '/Settlement/Order/createDeptAccount/', item );
        }
}])

