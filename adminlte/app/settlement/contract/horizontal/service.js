/**
 * @ngdoc service
 * @name 
 * @description
 * _Please update the description and dependencies._
 *
 * */
angular.module('settlement.contract.horizontal.service',[])
    .service('horizontal', [ "$http" , "MBS_DOMAIN" ,function( $http , MBS_DOMAIN ){
        this.get = function( order_no ) {
            return $http.post( MBS_DOMAIN + '/Settlement/Contract/getContractByOrderNo' , { order_no: order_no } )
        }
        this.select = function(item){
            return $http.post(MBS_DOMAIN + '/Settlement/Contract/contractCheck' , item);
        }
    }])