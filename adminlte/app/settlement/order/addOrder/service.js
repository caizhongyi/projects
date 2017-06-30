/**
 * @ngdoc service
 * @name 
 * @description
 * _Please update the description and dependencies._
 *
 * */
angular.module('settlement.order.addOrder.service',[])
    .service('settlementAdd', [ "$http" , "MBS_DOMAIN" ,function( $http , MBS_DOMAIN ){
        this.add = function( item ){
            return $http.post(MBS_DOMAIN + '/Settlement/Order/addOrder' , item );
        }
}])

