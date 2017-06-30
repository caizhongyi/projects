/**
 * @ngdoc service
 * @name Huph
 * @description
 * */
angular.module('settlement.reportSwiping.advancePay.service',[])
    .service('advancePay', [ "$http" , "MBS_DOMAIN" ,function( $http , MBS_DOMAIN ){

        this.get = function( paginationInfo , params ) {
            return $http.post( MBS_DOMAIN + '/Settlement/ReportSwiping/AdvancePay' , params )
        }
        this.excel = function(params){
            var para = '';
            for(var i in params){
                if(typeof (params[i]) != "undefined" && params[i] != null){
                    if(para){
                        para += '&';
                    }
                    para += i + '=' + params[i];
                }
            }
            location.href = (MBS_DOMAIN + '/Settlement/ReportSwiping/AdvancePay/1?' + para );
        };

}])

