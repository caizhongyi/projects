/**
 * @ngdoc service
 * @name 
 * @description
 * _Please update the description and dependencies._
 *
 * */
angular.module('acl.access.service')
    .service('acl.access.service', [ "$http",function( $http ){

    this.getAccessInfo = function() {
        return $http.get('');
    }

}]);

