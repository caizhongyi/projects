/**
 * @ngdoc service
 * @name
 * @description
 * _Please update the description and dependencies._
 *
 * */
angular.module( 'basicservice.App.addType.service',[])
    .service('addtype', [ "$http", "MBS_DOMAIN" , function( $http , MBS_DOMAIN){
        this.add = function( item ){
            return $http.post(MBS_DOMAIN + '/Basicservice/App/addType/' , item );
        }
    }])