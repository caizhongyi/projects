/**
 * @ngdoc service
 * @name
 * @description
 * _Please update the description and dependencies._
 *
 * */
angular.module( 'basicservice.Msg.msgList.service',[])
    .service('msg', [ "$http", "MBS_DOMAIN" , function( $http , MBS_DOMAIN){
        this.get = function( currentPage , pageSize ,  searchData ){
            var  searchData = searchData || '',currentPage = currentPage || 0, pageSize = pageSize || 100;
            return $http.post( MBS_DOMAIN + '/Basicservice/Msg/msgList/' + currentPage + '/'+ pageSize ,searchData);
        }
        this.getApp = function(){
            return $http.post( MBS_DOMAIN + '/Basicservice/Msg/appList/');
        }
    }])

