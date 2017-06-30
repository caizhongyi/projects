/**
 * @ngdoc service
 * @name
 * @description
 * _Please update the description and dependencies._
 *
 * */
angular.module( 'basicservice.App.appInfo.service',[])
    .service('appinfo', [ "$http", "MBS_DOMAIN" , function( $http , MBS_DOMAIN){
        this.get = function( currentPage , pageSize ,  searchData ){
            var  searchData = searchData || '',currentPage = currentPage || 0, pageSize = pageSize || 10;
            return $http.post( MBS_DOMAIN + '/Basicservice/App/appInfo/' + currentPage + '/'+ pageSize ,searchData);
        }
        this.add = function( item ){
            return $http.post(MBS_DOMAIN + '/Basicservice/App/addType/' , item );
        }
        
        this.update = function( item ){
            return $http.post(MBS_DOMAIN + '/Basicservice/App/editStatusApp/' , item );
        }
        
        this.getTypeList = function( item ){
            return $http.post(MBS_DOMAIN + '/Basicservice/App/getTypeList/' , item );
        }
    }])