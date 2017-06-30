/**
 * @ngdoc service
 * @name 
 * @description
 * _Please update the description and dependencies._
 *
 * */
angular.module('settlement.order.editOrder.service',[])
    .service('editOrder', [ "$http" , "MBS_DOMAIN" ,function( $http , MBS_DOMAIN ){
        this.get = function( item ){
            return $http.post(MBS_DOMAIN + '/Settlement/Order/editOrder' , item );
        }

        //保存订单金额修改
        this.updateOrderFee = function( item ){
            return $http.post(MBS_DOMAIN + '/Settlement/Order/updateOrderFee' , item );
        }

        //保存订单修改(合同已完善)
        this.updateOrder = function( item ){
            return $http.post(MBS_DOMAIN + '/Settlement/Order/updateOrderApplyFee' , item );
        }
}])

