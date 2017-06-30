/**
 * @ngdoc service
 * @name 
 * @description
 * _Please update the description and dependencies._
 *
 * */
angular.module('user.dept.index.service',[])
    .service('depts',[ "$http", "MBS_DOMAIN" ,function( $http, MBS_DOMAIN ){

        this.get = function( page, pageSize) {
            return $http.get(MBS_DOMAIN + '/User/Dept/getDeptList/token/1?page='+ ((page) || 0 ) +'&pageSize='+ (pageSize || 10 ))
        }

        this.update = function( item ){
            return $http.post(MBS_DOMAIN + '/User/Dept/updateDept/token/1', item );
        }

        this.add = function( item ){
            return $http.post(MBS_DOMAIN + '/User/Dept/addDept/token/1', item );
        }

        this.remove = function( id ){
            return $http.get(MBS_DOMAIN + '/User/Dept/deleteDept/token/1' , {id : id});
        }

        this.getDeptLevels = function(provinceId, cityId) {
            return $http.get(MBS_DOMAIN + '/User/Dept/getDeptLevels/token/1?province_id='+ provinceId +"&city_id="+cityId);
        }
}]);

