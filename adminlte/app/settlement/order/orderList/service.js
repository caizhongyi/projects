/**
 * @ngdoc service
 * @name 
 * @description
 * _Please update the description and dependencies._
 *
 * */
angular.module('settlement.order.orderList.service',[])
    .service('settlement', [ "$http" , "MBS_DOMAIN" ,function( $http , MBS_DOMAIN ){
        this.get = function( paginationInfo , params ) {
            return $http.post( MBS_DOMAIN + '/Settlement/Order/orderList/'+ paginationInfo.currentPage +'/'+ paginationInfo.pageSize , params )
        }

        this.update = function( item ){
            return $http.post(MBS_DOMAIN + '/Settlement/Order/updateOrderFee' , item );
        }
        this.remove = function( id ){
            return $http.post(MBS_DOMAIN + '/Settlement/Order/cancelOrder/', { id : id } );
        }
        this.add = function( item ){
            return $http.post(MBS_DOMAIN + '/Settlement/Order/addOrder' , item );
        }


        //合同列表
        this.contractList = function(){
            return $http.post(MBS_DOMAIN + '/Settlement/Contract/contractList' , item );
        }
        //重复订单查询
        this.isRepeatOrder = function(){
            return $http.post(MBS_DOMAIN + '/Settlement/Order/isRepeatOrder' , item );
        }


        // 结束订单
        this.finishOrder = function( item ){
            return $http.post(MBS_DOMAIN + '/Settlement/Order/finishOrder' , item );
        }

        //自动生成付款申请
        this.applyFlatformFee = function( item ){
            return $http.post(MBS_DOMAIN + '/Settlement/Apply/applyFlatformFee/' + item.order_no , item );
        }

        //自动生成付款申请
        this.unfreeze = function( item ){
            return $http.post(MBS_DOMAIN + '/Settlement/Order/unfreeze/' + item.order_no );
        }

        //发送短信通知转账
        this.noticeTransfer = function( item ){
            return $http.post(MBS_DOMAIN + '/Settlement/Order/createAccount/', item );
        }
}])


