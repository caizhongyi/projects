/**
 * @ngdoc service
 * @name
 * @description
 * _Please update the description and dependencies._
 *
 * */
angular.module( 'basicservice.App.editApp.service',[])
    .service('editApp', [ "$http", "MBS_DOMAIN" , function( $http , MBS_DOMAIN){
        this.update = function( item ){
            return $http.post(MBS_DOMAIN + '/Basicservice/App/editApp/' , item );
        }
        this.get = function(id){
            return $http.post(MBS_DOMAIN + '/Basicservice/App/getTypeById/' ,{id: id} );
        }
        this.getExtend = function(id){
            return $http.post(MBS_DOMAIN + '/Basicservice/App/extendList/' ,{id:id} );
        }
    }])