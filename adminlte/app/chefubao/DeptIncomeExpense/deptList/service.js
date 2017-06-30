/**
 * @ngdoc service
 * @name 
 * @description
 * _Please update the description and dependencies._
 *
 * */
angular.module('chefubao.DeptIncomeExpense.deptList.service',[])
    .service('deptList', [ "$http" , "MBS_DOMAIN" ,function( $http , MBS_DOMAIN ){
        this.get = function( paginationInfo , params ) {
            return $http.post( MBS_DOMAIN + '/Settlement/DeptAccount/getDeptDetailList/' + paginationInfo.currentPage , params )
        }
}])