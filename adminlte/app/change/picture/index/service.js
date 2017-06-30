/**
 * @ngdoc service
 * @name 
 * @description
 * _Please update the description and dependencies._
 *
 * */
angular.module('change.picture.index.service',[])
    .service('pictures', function( $http, MBS_DOMAIN ){

        //var token = $.cookie('token');
        var token = 1;


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
             ;
            return $http.get(MBS_DOMAIN + '/Change/Picture/getPictureList/token/1?' + paramsString);

        }

        this.updatestatus = function( item ){
            return $http.post(MBS_DOMAIN + '/Change/Picture/updatestatus/token/'+ token , item );
        }
});

