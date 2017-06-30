/**
 * @ngdoc service
 * @name 
 * @description
 * _Please update the description and dependencies._
 *
 * */
angular.module('basicservice.ShortUrl.index.service',[])
    .service('shorturl', [ "$http" , "MBS_DOMAIN" ,function( $http , MBS_DOMAIN ){
         this.get = function( paginationInfo , params ) {
            return $http.post( MBS_DOMAIN + '/basicservice/ShortUrl/urlInfo?currentPage='+ paginationInfo.currentPage +'&pageSize='+ paginationInfo.pageSize , params )
         }

        this.update = function( item ){
            return $http.post(MBS_DOMAIN + '/basicservice/ShortUrl/updateUrl' , item );
        }
        this.del = function( item ){
            return $http.post(MBS_DOMAIN + '/basicservice/ShortUrl/updateStatusUrl' , item );
        }
        this.urladd = function( item ){
            return $http.post(MBS_DOMAIN + '/basicservice/ShortUrl/addUrlDetail' , item );
        }
        this.getApp = function( item ){
            return $http.post(MBS_DOMAIN + '/basicservice/ShortUrl/getAppInfo'  , item);
        }

}])


