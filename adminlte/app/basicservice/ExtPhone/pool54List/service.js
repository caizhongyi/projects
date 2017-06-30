/**
 * @ngdoc service
 * @name
 * @description
 * _Please update the description and dependencies._
 *
 * */
angular.module( 'basicservice.ExtPhone.pool54List.service',[])
    .service('identify54', [ "$http", "MBS_DOMAIN" , function( $http , MBS_DOMAIN){
        this.get = function( currentPage , pageSize ,  searchData ){
            var  searchData = searchData || '',currentPage = currentPage || 0, pageSize = pageSize || 15;
            searchData.source = 54;
            searchData.fix_source = 1;
            searchData.pageSize = pageSize;
            //console.log(searchData);
            return $http.post( MBS_DOMAIN + '/Basicservice/MbsExtPhone/getBindList/' + currentPage + '/'+ pageSize ,searchData);
        }
        this.hasAddAuth = function( userId ){
            return $http.get("http://mbs.273.cn/Trade/index/hasAddAuth/"+ userId );
        }
        this.remove = function(){
            return $http.get();
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

