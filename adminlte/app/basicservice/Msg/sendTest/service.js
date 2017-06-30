/**
 * @ngdoc service
 * @name
 * @description
 * _Please update the description and dependencies._
 *
 * */
angular.module( 'basicservice.Msg.sendTest.service',[])
    .service('countD', [ "$http", "MBS_DOMAIN" , function( $http , MBS_DOMAIN){
        this.get = function(){
            return $http.post( MBS_DOMAIN + '/Basicservice/ChannelDosage/baseAppAuthList/');
        }
        this.call = function(item){
            return $http.post( MBS_DOMAIN + '/Basicservice/ChannelDosage/smsTest/', item);
        }
    }])