/**
 * @ngdoc service
 * @name Huph
 * @description
 * */
angular.module('settlement.reportSwiping.swipingList.service',[])
    .service('reportSwiping', [ "$http" , "MBS_DOMAIN" ,function( $http , MBS_DOMAIN ){
        this.get = function( paginationInfo , params ) {
            //console.log(params);
            return $http.post( MBS_DOMAIN + '/Settlement/ReportSwiping/SwipingList' , params )
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
            location.href = (MBS_DOMAIN + '/Settlement/ReportSwiping/SwipingList/1?' + para );
        }
        this.seal = function(params){
            return $http.post( MBS_DOMAIN + '/Settlement/SealInfo/seal' , params )
        }
        this.viewSealInfo = function(params){
            return $http.post( MBS_DOMAIN + '/Settlement/SealInfo/getSealInfo' , params )
        }
}])

