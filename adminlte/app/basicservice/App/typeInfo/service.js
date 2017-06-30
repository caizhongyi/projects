/**
 * @ngdoc service
 * @name
 * @description
 * _Please update the description and dependencies._
 *
 * */
angular.module( 'basicservice.App.typeInfo.service',[])
    .service('apptype', [ "$http", "MBS_DOMAIN" , function( $http , MBS_DOMAIN){
        this.get = function( currentPage , pageSize ,  searchData ){
            var  searchData = searchData || '',currentPage = currentPage || 0, pageSize = pageSize || 10;
            return $http.post( MBS_DOMAIN + '/Basicservice/App/typeInfo/' + currentPage + '/'+ pageSize ,searchData);
        }
        this.add = function( item ){
            return $http.post(MBS_DOMAIN + '/Basicservice/App/addType/' , item );
        }
        this.update = function( item ){
            return $http.post(MBS_DOMAIN + '/Basicservice/App/ediTypeApp/' , item );
        }
        this.remove = function(){
            return $http.get();
        }
    }])