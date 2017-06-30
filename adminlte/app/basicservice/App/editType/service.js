/**
 * @ngdoc service
 * @name
 * @description
 * _Please update the description and dependencies._
 *
 * */
angular.module( 'basicservice.App.editType.service',[])
    .service('edittype', [ "$http", "MBS_DOMAIN" , function( $http , MBS_DOMAIN){
        this.add = function( item ){
            return $http.post(MBS_DOMAIN + '/Basicservice/App/addType/' , item );
        }
        this.get = function( id ){
            return $http.post(MBS_DOMAIN + '/Basicservice/App/getType/' , {id:id} );
        }
        
        this.update = function( item ){
            return $http.post(MBS_DOMAIN + '/Basicservice/App/updateType/' , item );
        }
    }])