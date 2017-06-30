/**
 * @ngdoc service
 * @name
 * @description
 * _Please update the description and dependencies._
 *
 * */

angular.module('user.car.index.service',[])
    .service('users',[ "$http" , "MBS_DOMAIN", function( $http , MBS_DOMAIN){
        this.get = function( page, pageSize) {
            return $http.get(MBS_DOMAIN + '/User/Users/getUserList/token/1?page='+ ((page) || 0 ) +'&pageSize='+ (pageSize || 10 ))
        }

        this.update = function( item ){
            return $http.post(MBS_DOMAIN + '/User/Users/updateUser/token/1' , item );
        }

        this.add = function( item ){
            return $http.post(MBS_DOMAIN + '/User/Users/addUser/token/1' , item );
        }

        this.remove = function( id ){
            return $http.get(MBS_DOMAIN + '/User/Users/deleteUser/token/1/?id='+id );
        }
}])




