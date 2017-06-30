/**
 * @ngdoc service
 * @name Huph
 * @description
 * */
angular.module('settlement.reportSwiping.swingList.service',[])
    .service('reportSwing', [ "$http" , "MBS_DOMAIN" ,function( $http , MBS_DOMAIN ){
        this.get = function( paginationInfo , params ) {
            return $http.post( MBS_DOMAIN + '/Settlement/ReportSwiping/SwingList' , params )
        }
        this.seal = function(params){
            return $http.post( MBS_DOMAIN + '/Settlement/SealInfo/seal' , params )
        }
        this.viewSealInfo = function(params){
            return $http.post( MBS_DOMAIN + '/Settlement/SealInfo/getSealInfo' , params )
        }
}])

