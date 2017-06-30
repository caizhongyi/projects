/**
 * @ngdoc service
 * @name Huph
 * @description
 * */
angular.module('settlement.reportSwiping.unpayList.service',[])
    .service('unpayList', [ "$http" , "MBS_DOMAIN" ,function( $http , MBS_DOMAIN ){

        this.get = function( paginationInfo , params ) {
            return $http.post( MBS_DOMAIN + '/Settlement/ReportSwiping/UnpayList' , params )
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
            location.href = (MBS_DOMAIN + '/Settlement/ReportSwiping/UnpayList/1?' + para );
        };

}])

