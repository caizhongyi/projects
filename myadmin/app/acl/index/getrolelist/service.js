/**
 * @ngdoc service
 * @name 
 * @description
 * _Please update the description and dependencies._
 *
 * */
angular.module('app.acl.index.getrolelist.service',[])
    .service('roles', function( $http ){
        this.get = function( page , key , pageSize ) {
            return $http.get('http://mbs.273.cn/Acl/Index/getRoleList/'+ ((page) || 0 ) +'/'+ (key || 0 ) +'/'+ (pageSize || 10 ))
        }
        this.update = function( item ){
            return $http.post('http://mbs.273.cn/Acl/Index/editRole' , item );
        }
        this.remove = function( id ){
            return $http.get('http://mbs.273.cn/Acl/Index/deleteRole/'+id );
        }
        this.add = function( item ){
            return $http.post('http://mbs.273.cn/Acl/Index/addRole' , item );
        }
});

