/**
 * @ngdoc service
 * @name 
 * @description
 * _Please update the description and dependencies._
 *
 * */
angular.module('settlement.statement.getStatementList.service',[])
    .service('statementList', [ "$http" , "MBS_DOMAIN" ,function( $http , MBS_DOMAIN ){
        this.get = function( paginationInfo , params ) {
            return $http.post( MBS_DOMAIN + '/Settlement/Statement/getStatementList/'+ paginationInfo.currentPage +'/'+ paginationInfo.pageSize , params )
        }

        this.select = function(item){
            return $http.post(MBS_DOMAIN + '/Settlement/Statement/statementBalance' , item);
        }

}])

