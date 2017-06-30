angular.module('out.wechat.statistics.service', [])
    .service('count', ["$http", "OUT_DOMAIN", function ($http, OUT_DOMAIN) {
        this.get = function (page, pageSize, params) {
            return $http.get(OUT_DOMAIN + '/vadmin/Wechat/Sale/getStatistics?currentPage=' + ((page) || 1 ) + (params.name || '') + '&starTime='+ (params.starTime || '') + '&endTime='+ (params.endTime || '') + '&size=' + (pageSize || 10 ))
        }

    }])