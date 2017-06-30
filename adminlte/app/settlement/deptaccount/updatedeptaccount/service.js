/**
 * @ngdoc service
 * @name 
 * @description
 * _Please update the description and dependencies._
 *
 * */
angular.module('settlement.deptAccount.updateDeptAccount.service',[])
    .service('updAccount', [ "$http" , "MBS_DOMAIN" ,function( $http , MBS_DOMAIN ){
        //根据id获取门店账户信息
        this.get = function( id ) {
            return $http.get( MBS_DOMAIN + '/Settlement/DeptAccount/getDeptAccountById/' + id )
        }

        this.update = function( item ){
            return $http.post(MBS_DOMAIN + '/Settlement/DeptAccount/updateDeptAccount/' + item.id  , item );
        }

        this.add = function( item ){
            return $http.post(MBS_DOMAIN + '/Settlement/DeptAccount/addDeptAccount/' , item );
        }
}])


