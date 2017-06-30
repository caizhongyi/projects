/**
 * @ngdoc service
 * @name
 * @description
 * _Please update the description and dependencies._
 *
 * */
angular.module( 'basicservice.Msg.countList.service',[])
    .service('countU', [ "$http", "MBS_DOMAIN" , function( $http , MBS_DOMAIN){
        this.get = function(item){
            return $http.post( MBS_DOMAIN + '/Basicservice/Msg/countList/', item);
        }
        this.update = function(item){
            return $http.post( MBS_DOMAIN + '/Basicservice/Msg/oprationSms/', item);
        }
        this.getBlackList = function(){
            return $http.post( MBS_DOMAIN + '/Basicservice/Msg/getBlackList/');
        }
    }])

