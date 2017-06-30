/**
 * @ngdoc service
 * @name 
 * @description
 * _Please update the description and dependencies._
 *
 * */
angular.module('settlement.statement.detail.service',[])
    .service('statementDetailList', [ "$http" , "MBS_DOMAIN" ,function( $http , MBS_DOMAIN ){
        this.get = function( paginationInfo , params ) {
            return $http.post( MBS_DOMAIN + '/Settlement/Statement/getStatementDetailList/'+ paginationInfo.currentPage +'/'+ paginationInfo.pageSize , params )
        }


}])

