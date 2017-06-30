/**
 * @ngdoc service
 * @name 
 * @description
 * _Please update the description and dependencies._
 *
 * */
angular.module('settlement.finance.index.service',[])
    .service('finance', [ "$http" , "MBS_DOMAIN" ,function( $http , MBS_DOMAIN ){
        this.get = function( paginationInfo , params ) {
            return $http.post( MBS_DOMAIN + '/Settlement/Finance/index/'+ paginationInfo.currentPage +'/'+ paginationInfo.pageSize , params );
        };
        this.update = function( item ){
            return $http.post(MBS_DOMAIN + '/Settlement/Finance/financePay' , item );
        };
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
            location.href = (MBS_DOMAIN + '/Settlement/Finance/allList/1?' + para );
        };
        //驳回审核
        this.reject = function( item ){
            return $http.post( MBS_DOMAIN + '/Settlement/Apply/applyReject/'+ item.id  , item );
        }
        this.add = function( item ){
            return $http.post(MBS_DOMAIN + '/Settlement/Finance/errorReturn' , item );
        };
    }])
    .service('financePrint', [ "$http" , "MBS_DOMAIN" ,function( $http , MBS_DOMAIN ){
        this.get = function( paginationInfo , params ) {
            return $http.post( MBS_DOMAIN + '/Settlement/Finance/allList', params );
        };
    }])
    .service('printUpdate', ["$http" , "MBS_DOMAIN" ,function( $http , MBS_DOMAIN ){
        this.update = function( params ) {
            $http.post( MBS_DOMAIN + '/Settlement/Finance/printUpdate', params );
        };
    }])
;