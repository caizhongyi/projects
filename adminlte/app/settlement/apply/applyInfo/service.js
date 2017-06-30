/**
 * @ngdoc service
 * @name 
 * @description
 * _Please update the description and dependencies._
 *
 * */
angular.module('settlement.apply.applyInfo.service',[])
    .service('applyInfo', [ "$http" , "MBS_DOMAIN" ,function( $http , MBS_DOMAIN ){

        this.get = function( item ) {
            return $http.post( MBS_DOMAIN + '/Settlement/Apply/applyInfo/'+ item.id )
        }

        this.check = function( item ){
            return $http.post( MBS_DOMAIN + '/Settlement/Apply/applyCheck/'+ item.id  , item );
        }

        this.passContract = function( item ){
            return $http.post( MBS_DOMAIN + '/Settlement/Contract/contractCheck', item );
        }

        this.rejectContract = function( item ){
            return $http.post( MBS_DOMAIN + '/Settlement/Contract/contractRefund', item );
        }

    }])

