/**
 * @ngdoc service
 * @name 
 * @description
 * _Please update the description and dependencies._
 *
 * */
angular.module('settlement.trade.edit.service',[])
    .service('edit', ["$http" , "MBS_DOMAIN" , function( $http , MBS_DOMAIN){
        this.get = function( id ){
            return $http.post( MBS_DOMAIN + "/Settlement/Trade/editTradeDetail/" )
        }
        this.getById = function( id ){
            return $http.get( MBS_DOMAIN + "/Settlement/Trade/getTradeDetailInfo/" + id )
        }
        //this.update = function( item){
        //    return $http.post( MBS_DOMAIN + "/Settlement/Trade/saveTradeDetail/submit" , item );
        //}
        //this.draft = function( item  ){
        //    return $http.post( MBS_DOMAIN + "/Settlement/Trade/saveTradeDetail" , item );
        //}
}])

