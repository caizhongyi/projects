/**
 * @ngdoc service
 * @name
 * @description
 * _Please update the description and dependencies._
 *
 * */
angular.module( 'basicservice.App.dosageRemain.service',[])
    .service('counts', [ "$http", "MBS_DOMAIN" , function( $http , MBS_DOMAIN){
        this.get = function(){
            return $http.post( MBS_DOMAIN + '/Basicservice/ChannelDosage/allCountList/');
        }
    }])