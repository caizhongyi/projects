/**
 * @ngdoc service
 * @name 
 * @description
 * _Please update the description and dependencies._
 *
 * */
angular.module('settlement.reportDept.reportDeptDetail.service',[])
    .service('reportDeptDetail', [ "$http" , "MBS_DOMAIN" ,function( $http , MBS_DOMAIN ){
        this.get = function( paginationInfo , params ) {
            return $http.post( MBS_DOMAIN + '/Settlement/ReportDept/reportDeptDetail/'+ paginationInfo.currentPage +'/'+ paginationInfo.pageSize , params )
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
            location.href = (MBS_DOMAIN + '/Settlement/ReportDept/reportDeptDetail/1?' + para + '&download=1' );
        }
        this.seal = function(params){
            return $http.post( MBS_DOMAIN + '/Settlement/SealInfo/seal' , params )
        }
        this.viewSealInfo = function(params){
            return $http.post( MBS_DOMAIN + '/Settlement/SealInfo/getSealInfo' , params )
        }
}])

