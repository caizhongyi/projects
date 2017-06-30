/**
 * @ngdoc service
 * @name
 * @description
 * _Please update the description and dependencies._
 *
 * */
angular.module( 'basicservice.Transfer.transferList.service',[])
    .service('identify', [ "$http", "MBS_DOMAIN" , function( $http , MBS_DOMAIN){
        this.get = function( currentPage , pageSize ,  searchData ){
            var  searchData = searchData || '',currentPage = currentPage || 0, pageSize = pageSize || 10;
            return $http.post( MBS_DOMAIN + '/Basicservice/VinSearch/getRecordList/' + currentPage + '/'+ pageSize ,searchData);
        }
        this.hasAddAuth = function( userId ){
            return $http.get("http://mbs.273.cn/Trade/index/hasAddAuth/"+ userId );
        }
        this.remove = function(){
            return $http.get();
        }
    }])

