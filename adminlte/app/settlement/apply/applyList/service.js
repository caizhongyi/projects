/**
 * @ngdoc service
 * @name 
 * @description
 * _Please update the description and dependencies._
 *
 * */
angular.module('settlement.apply.applyList.service',[])
    .service('applyList', [ "$http" , "MBS_DOMAIN" ,function( $http , MBS_DOMAIN ){

        this.get = function( paginationInfo , params ) {
            return $http.post( MBS_DOMAIN + '/Settlement/Apply/applyList/'+ paginationInfo.currentPage +'/'+ paginationInfo.pageSize , params )
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

        //驳回审核
        this.reject = function( item ){
            return $http.post( MBS_DOMAIN + '/Settlement/Apply/applyCheck/'+ item.id  , item );
        }

        this.select = function(item){
            return $http.post(MBS_DOMAIN + '/Settlement/Contract/contractRefund' , item);
        }
}])

