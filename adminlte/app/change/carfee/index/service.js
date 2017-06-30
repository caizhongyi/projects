/**
 * @ngdoc service
 * @name
 * @description
 * _Please update the description and dependencies._
 *
 * */

angular.module('change.carfee.index.service',[])
    .service('carfees', function( $http, MBS_DOMAIN ){

        this.get = function( page, pageSize, params) {

            params.page = page || 0;
            params.pageSize = pageSize || 10;

            var paramString = [];
            // 对象转换成 url get 参数
            angular.forEach(params, function(value, key) {
                if (value) {
                    this.push(key + '='+ value);
                }
            }, paramString);
            var paramsString = paramString.join('&');

            return $http.get(MBS_DOMAIN + '/Change/Carfee/getCarfeeeList/token/1?' + paramsString);
        }

        this.update = function( item ){
            return $http.post(MBS_DOMAIN + '/Change/Carfee/updateCarfee/token/1' , item );
        }

        this.add = function( item ){
            return $http.post(MBS_DOMAIN + '/Change/Carfee/addCarfee/token/1', item );
        }


})




