/**
 * @ngdoc service
 * @name 
 * @description
 * _Please update the description and dependencies._
 *
 * */
angular.module('settlement.reportDept.reportDeptAccount.service',[])
    .service('reportDept', [ "$http" , "MBS_DOMAIN" ,function( $http , MBS_DOMAIN ){
        this.get = function( paginationInfo , params ) {
            return $http.post( MBS_DOMAIN + '/Settlement/ReportDept/reportDeptAccount/'+ paginationInfo.currentPage +'/'+ paginationInfo.pageSize , params )
        }

}])

