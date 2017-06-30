/**
 * @ngdoc service
 * @name 
 * @description
 * _Please update the description and dependencies._
 *
 * */
angular.module('settlement.deptAccountDepositApply.getDeptAccountDepositApplyList.service',[])
    .service('depositApply', [ "$http" , "MBS_DOMAIN" ,function( $http , MBS_DOMAIN ){
        this.get = function( paginationInfo , params ) {
            return $http.post( MBS_DOMAIN + '/Settlement/DeptAccountDepositApply/getDeptAccountDepositApplyList/'+ paginationInfo.currentPage +'/'+ paginationInfo.pageSize , params )
        }

        this.checkDeptAccountDepositApply = function( item ) {
            return $http.post( MBS_DOMAIN + '/Settlement/DeptAccountDepositApply/checkDeptAccountDepositApply/' , item )
        }
        this.excel = function(params){
            var para = '';
            for(var i in params){
                if(typeof (params[i]) != "undefined" && params[i] != null){
                    if(para){
                        para += '&';
                    }
                    para += i + '=' + params[i];
                }
            }
            location.href = (MBS_DOMAIN + '/Settlement/DeptAccountDepositApply/getDeptAccountDepositApplyList/1?' + para + '&download=1' );
        }

}])

