/**
 * @ngdoc service
 * @name
 * @description
 * _Please update the description and dependencies._
 *
 * */
angular.module( 'basicservice.App.addApp.service',[])
    .service('addApp', [ "$http", "MBS_DOMAIN" , function( $http , MBS_DOMAIN){
        this.add = function( item ){
            return $http.post(MBS_DOMAIN + '/Basicservice/App/addApp/' , item );
        }
        this.get = function( typeName){
            return $http.post(MBS_DOMAIN + '/Basicservice/App/getTypeByName/', {app: typeName} );
        }
        this.getExtend = function(app_name){
            return $http.post(MBS_DOMAIN + '/Basicservice/App/extendListOk/', {app_name:app_name});
        }
    }])