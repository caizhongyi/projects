/**
 * @ngdoc service
 * @name
 * @description
 * _Please update the description and dependencies._
 *
 * */
angular.module( 'basicservice.User.userInfo.service',[])
    .service('basicserviceUsers', [ "$http", "MBS_DOMAIN" , function( $http, MBS_DOMAIN ){
        this.get = function( currentPage , pageSize ,  search ){
            var  search = search || '',currentPage = currentPage || 0, pageSize = pageSize || 10;
            return $http.post( MBS_DOMAIN + '/basicservice/User/userInfo/' + currentPage + '/'+ pageSize ,search);
        }
        /*this.update = function( item ){
            return $http.post(MBS_DOMAIN + '/User/Users/updateUser/token/1' , item );
        }*/

        this.add = function( item ){
            return $http.post(MBS_DOMAIN + '/basicservice/User/addUser/', item );
        }

       /* this.remove = function( id ){
            return $http.get(MBS_DOMAIN + '/User/Users/deleteUser/token/1/id/' + id);
        }*/
    }])