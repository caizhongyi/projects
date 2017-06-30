angular.module('log.mongo.index.service',[])
    .service('mongo', [ "$http" , "MBS_DOMAIN", function( $http , MBS_DOMAIN){
        this.getLogs = function( item ){
            return $http.post(MBS_DOMAIN + '/Basicservice/MongoLog/index', item);
        }
}]);




