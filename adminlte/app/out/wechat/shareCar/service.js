angular.module('out.wechat.shareCar.service', [])
    .service('share', ["$http", "OUT_DOMAIN", function ($http, OUT_DOMAIN) {
        this.get = function (page, pageSize, params) {
            return $http.get(OUT_DOMAIN + '/vadmin/Wechat/Sale/getShareList?currentPage=' + ((page) || 1 ) + '&id=' + (params.name || '') + '&size=' + (pageSize || 10 ))
        }


        this.add = function (item) {
            return $http.post(OUT_DOMAIN + '/vadmin/Wechat/Sale/getCarList', item);
        }
        this.del = function (item) {
            return $http.post(OUT_DOMAIN + '/vadmin/Wechat/Sale/deleteShareCar', item);
        }
    }])