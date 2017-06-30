/**
 * @ngdoc service
 * @name 
 * @description
 * _Please update the description and dependencies._
 *
 * */
angular.module('app.acl-access-service')
    .service('app.acl.access.service', function( $http ){

    this.getAccessInfo = function() {
        return $http.get('');
    }

});

