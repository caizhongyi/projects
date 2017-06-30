/**
 * @ngdoc service
 * @name
 * @description
 * _Please update the description and dependencies._
 *
 * */
angular.module('out.wechat.saleDetails.service', [])
    .service('saleCarDetail', ["$http", "OUT_DOMAIN", function ($http, OUT_DOMAIN) {
        this.get = function (id) {
            return $http.get(OUT_DOMAIN + '/vadmin/Wechat/Sale/getCarInfo?id=' + id, {id: id});
        }
    }])