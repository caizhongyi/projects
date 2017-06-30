/**
 * @ngdoc service
 * @name
 * @description
 * _Please update the description and dependencies._
 *
 * */
angular.module( 'basicservice.Transfer.transferList.service',[])
    .service('transfer', [ "$http", "MBS_DOMAIN" , function( $http , MBS_DOMAIN){
        this.get = function( currentPage , pageSize ,  searchData ){
            var  searchData = searchData || '',currentPage = currentPage || 0, pageSize = pageSize || 100;
            return $http.post( MBS_DOMAIN + '/Basicservice/Transfer/transferList/' + currentPage + '/'+ pageSize ,searchData);
        }
    }])
    .service("area", ["$http", "MBS_DOMAIN", function ($http, MBS_DOMAIN) {
        var MBS_DOMAIN = "http://open.273.cn";
        this.province = function () {
            return $http.get(MBS_DOMAIN + '/Cache/Location/getProvinceList/?acceess_token=1');
        }
        this.city = function (provinceId) {
            return $http.get(MBS_DOMAIN + '/Cache/Location/getCityListByProvinceId/?acceess_token=1&id=' + provinceId);
        }
        this.cityDetail = function (id) {
            return $http.get(MBS_DOMAIN + '/Cache/Location/getCityDetailById/?acceess_token=1&id=' + id);
        }
        this.destrict = function (cityId) {
            return $http.get(MBS_DOMAIN + '/Cache/Location/getDestrictListByCityId/?acceess_token=1&id=' + cityId);
        }
        this.shop = function (cityId) {
            return $http.get(MBS_DOMAIN + '/Cache/Dept/getAllDeptListByCity/?acceess_token=1&city_id=' + cityId);
        }
        this.carfee = function() {
            return $http.get(MBS_DOMAIN + '/Cache/Carfee/getCarFeeTypeList/access_token/1/city_id/' + 1);
        }
        this.getUser = function(deptId){
            return $http.post( MBS_DOMAIN + '/Basicservice/Work/getUserListByDept' ,{dept_id : deptId});
        }

    }])

