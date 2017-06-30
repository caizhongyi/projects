/**
 * @ngdoc service
 * @name 
 * @description
 * _Please update the description and dependencies._
 *
 * */
angular.module('contract.contract.printShow.service',[])
    .service('printShow', [ "$http" , "MBS_DOMAIN" ,function( $http , MBS_DOMAIN ){
        this.get = function( id ) {
            return $http.post( MBS_DOMAIN + '/Contract/Contract/getContractById/' + id)
        }
        this.updateNo = function( params ) {
            $http.post( MBS_DOMAIN + '/Contract/Contract/updateContractNo/' + params );
        };
        this.updatePrintTimes = function( params ) {
            $http.post( MBS_DOMAIN + '/Contract/Contract/updatePrintTimes/' + params );
        };
    }])