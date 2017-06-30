/**
 * @ngdoc service
 * @name 
 * @description
 * _Please update the description and dependencies._
 *
 * */
angular.module('trade.index.index.service',[])
    .service('trade', [ "$http" , "MBS_DOMAIN" ,function( $http , MBS_DOMAIN ){
        this.get = function( page , key , pageSize ) {
            return $http.get(MBS_DOMAIN + '/Trade/Index/getTradeDetail/'+ ((page) || 0 ) +'/'+ (key || 0 ) +'/'+ (pageSize || 10 ))
        }
        this.update = function( item ){
            return $http.post(MBS_DOMAIN + '/ACL/Index/editRole' , item );
        }
        this.remove = function( id ){
            return $http.get(MBS_DOMAIN + '/ACL/Index/deleteRole/'+id );
        }
        this.add = function( item ){
            return $http.post(MBS_DOMAIN + '/ACL/Index/addRole' , item );
        }
        this.getUsersById = function( id ){
            return $http.get(MBS_DOMAIN + '/ACL/Index/getUsersByRoleId/'+id );
        }
        this.updateUsers = function( item ){
            return $http.post(MBS_DOMAIN + '/ACL/Index/setUserRole/' + item.roleId, item );
        }
        this.deleteUserRole = function( item ){
            return $http.post(MBS_DOMAIN + '/ACL/Index/deleteUserRole/' + item.roleId, item );
        }
        this.setCode = function( id , code ){
            return $http.get(MBS_DOMAIN + '/ACL/Index/setRoleCode/'+ id +'/' + code );
        }
        this.getCodeById = function( id ){
            return $http.get(MBS_DOMAIN + '/ACL/Index/getCodeByRoleId/' + id );
        }
}])

