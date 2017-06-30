/**
 * @ngdoc service
 * @name Huph
 * @description
 * */
angular.module('settlement.trade.index.service',[])
    .service('trade', [ "$http" , "MBS_DOMAIN" ,function( $http , MBS_DOMAIN ){
        this.get = function( paginationInfo , params ) {
            return $http.post( MBS_DOMAIN + '/Settlement/Trade/getList/'+ paginationInfo.currentPage +'/'+ paginationInfo.pageSize , params )
        }

        this.hasAddAuth = function( userId ){
            return $http.get(MBS_DOMAIN + '/Settlement/Trade/hasAddAuth/'+ userId );
        }
        this.unfinishedTrade = function(){
            return $http.get(MBS_DOMAIN + '/Settlement/Trade/getV3ContractCount/' );
        }

}])

