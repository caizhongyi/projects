/**
 * @ngdoc service
 * @name
 * @description
 * _Please update the description and dependencies._
 *
 * */

angular.module('user.car.recom.service',[])
    .service('recoms',["$http", "MBS_DOMAIN", function( $http, MBS_DOMAIN ){



        this.get = function( page, pageSize, params) {
            var paramString = [];
            angular.forEach(params, function(value, key) {
                if (value) {
                    this.push(key + '='+ value);
                }
            }, paramString);

            var paramsString = paramString.join('&');
 
            return $http.get(MBS_DOMAIN + '/Car/Recom/getList/token/1?page='+ ((page) || 0 ) +'&pageSize='+ (pageSize || 10 ) + '&' + paramsString)
        }

        this.setRecom = function( id ){
            return $http.post(MBS_DOMAIN + '/Car/Recom/setRecom/token/1', {id : id} );
        }

        this.cancelRecom = function( id ){
            return $http.post(MBS_DOMAIN + '/Car/Recom/cancelRecom/token/1', {id : id} );
        }

        this.getDistrict = function() {
            return $http.get(MBS_DOMAIN + '/User/Common/getDistrictList/token/1');
        }
}])




