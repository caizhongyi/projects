/**
 * @ngdoc service
 * @name
 * @description
 * _Please update the description and dependencies._
 *
 * */
angular.module('out.wechat.buyDetails.service',[])
    .service('buyCarDetail', [ "$http" , "OUT_DOMAIN" ,function( $http , OUT_DOMAIN ){
        this.get = function( car_id ) {
            return $http.get(OUT_DOMAIN + '/vadmin/Wechat/Sale/buyDetails?car_id='+ car_id, { car_id: car_id } );
        }
    }])