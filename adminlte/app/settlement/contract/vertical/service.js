/**
 * @ngdoc service
 * @name 
 * @description
 * _Please update the description and dependencies._
 *
 * */
angular.module('settlement.contract.vertical.service',[])
    .service('settlement', [ "$http" , "MBS_DOMAIN" ,function( $http , MBS_DOMAIN ){
        this.get = function( paginationInfo , params ) {
            return $http.post( MBS_DOMAIN + '/Settlement/Order/orderList/'+ paginationInfo.currentPage +'/'+ paginationInfo.pageSize , params )
        }
        //合同列表
        this.contractList = function(){
            return $http.post(MBS_DOMAIN + '/Settlement/contract/contractList' , item );
        }
        //重复订单查询
        this.isRepeatOrder = function(){
            return $http.post(MBS_DOMAIN + '/Settlement/order/isRepeatOrder' , item );
        }
        // 申请车款
        this.applyCarFee = function( item ){
            return $http.post(MBS_DOMAIN + '/Settlement/carFee/applyCarFee' , item );
        }
        this.update = function( item ){
            return $http.post(MBS_DOMAIN + '/Settlement/contract/editContract' , item );
        }
        this.remove = function( id ){
            return $http.get(MBS_DOMAIN + '/ACL/Index/deleteRole/' + id );
        }
        this.add = function( item ){
            return $http.post(MBS_DOMAIN + '/Settlement/order/addOrder' , item );
        }
    }])