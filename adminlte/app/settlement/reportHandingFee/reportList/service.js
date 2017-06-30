/**
 * @ngdoc service
 * @name 
 * @description
 * _Please update the description and dependencies._
 *
 * */
angular.module('settlement.reportHandingFee.reportList.service',[])
    .service('reportHandingFee', [ "$http" , "MBS_DOMAIN" ,function( $http , MBS_DOMAIN ){
        this.get = function( paginationInfo , params ) {
            return $http.post( MBS_DOMAIN + '/Settlement/reportHandingFee/reportList/' + paginationInfo.currentPage + '/'+ paginationInfo.pageSize, params )
        }

        this.updateStatus = function(item){
            return $http.post(MBS_DOMAIN + '/Settlement/reportHandingFee/updateHandingFee/' + item.id );
        }
}])

