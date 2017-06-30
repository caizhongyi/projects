/**
 * @ngdoc service
 * @name 
 * @description
 * _Please update the description and dependencies._
 *
 * */
angular.module('settlement.reportDept.reportDeptOrder.service',[])
    .service('reportDeptOrder', [ "$http" , "MBS_DOMAIN" ,function( $http , MBS_DOMAIN ){
        this.get = function( paginationInfo , params ) {
            return $http.post( MBS_DOMAIN + '/Settlement/ReportDept/reportDeptOrder/'+ paginationInfo.currentPage +'/'+ paginationInfo.pageSize , params )
        }

}])

