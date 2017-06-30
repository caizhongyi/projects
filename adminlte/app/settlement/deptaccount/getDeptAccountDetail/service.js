/**
 * @ngdoc service
 * @name 
 * @description
 * _Please update the description and dependencies._
 *
 * */
angular.module('settlement.deptAccount.getDeptAccountDetail.service',[])
    .service('getDeptAccountDetail', [ "$http" , "MBS_DOMAIN" ,function( $http , MBS_DOMAIN ){
        this.get = function( paginationInfo , params ) {
            return $http.post( MBS_DOMAIN + '/Settlement/DeptAccount/getDeptAccountDetail/'+ paginationInfo.currentPage +'/'+ paginationInfo.pageSize , params )
        }

}])

