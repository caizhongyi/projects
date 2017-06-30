/**
 * @ngdoc service
 * @name
 * @description
 * _Please update the description and dependencies._
 *
 * */

angular.module('change.product.index.service',[])
    .service('products', function( $http, MBS_DOMAIN ){

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

            return $http.get(MBS_DOMAIN + '/Change/Product/getProductList/token/1?' + paramsString);
        }

        this.update = function( item ){
            return $http.post(MBS_DOMAIN + '/Change/Product/updateProduct/token/1' , item );
        }

        this.add = function( item ){
            return $http.post(MBS_DOMAIN + '/Change/Product/addProduct/token/1', item );
        }

        this.remove = function( id ){
            return $http.get(MBS_DOMAIN + '/Change/Product/delProduct/token/1/id/' + id);
        }
})




