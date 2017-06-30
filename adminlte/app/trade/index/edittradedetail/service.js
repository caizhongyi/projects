/**
 * @ngdoc service
 * @name 
 * @description
 * _Please update the description and dependencies._
 *
 * */
angular.module('trade.index.edittradedetail.service',[])
    .service('tradeDetail', ["$http" , function( $http ){
        this.get = function( id , userId){
            return $http.get("http://mbs.273.cn/Trade/index/editTradeDetail/" + userId )
        }
        this.getById = function( id ){
            return $http.get("http://mbs.273.cn/Trade/index/getTradeDetailInfo/" + id )
        }
        this.update = function( item){
            return $http.post("http://mbs.273.cn/Trade/index/saveTradeDetail/submit" , item );
        }
        this.draft = function( item  ){
            return $http.post("http://mbs.273.cn/Trade/index/saveTradeDetail" , item );
        }
}])

