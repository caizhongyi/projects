/**
 * @ngdoc service
 * @name 
 * @description
 * _Please update the description and dependencies._
 *
 * */
angular.module('settlement.finance.pay.service',[])
    .service('settlement.finance.pay.service.financePay', [ "$http" , "MBS_DOMAIN" ,function( $http , MBS_DOMAIN ){
        this.get = function(params) {
            return $http.post( MBS_DOMAIN + '/Settlement/Finance/getPayList/', params);
        }

        this.pay = function(params){
            return $http.post(MBS_DOMAIN + '/Settlement/Finance/pay', params);
        }
}])

