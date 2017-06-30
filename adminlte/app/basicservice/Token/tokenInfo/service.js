angular.module( 'basicservice.Token.tokenInfo.service',[])
    .service('token', [ "$http", "MBS_DOMAIN" , function( $http , MBS_DOMAIN){
        this.get = function(){
            return $http.post( MBS_DOMAIN + '/Basicservice/App/getAppInfo/' );
        }
        this.getAccount = function() {
            return $http.post( MBS_DOMAIN + '/Basicservice/App/getAppInfo/' );
        }
        this.add = function( item ){
            console.log(item);
            return $http.post(MBS_DOMAIN + '/Basicservice/Token/addtoken' , item );
        }
    }])