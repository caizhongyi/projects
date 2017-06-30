/**
 * @ngdoc service
 * @name 
 * @description
 * _Please update the description and dependencies._
 *
 * */
angular.module('settlement.apply.refundApply.service',[])
    .service('applyRefund', [ "$http" , "MBS_DOMAIN" ,function( $http , MBS_DOMAIN ){
        this.get = function( page , key , pageSize ) {
            var page = page || 0, key = key || '', pageSize = pageSize || 10 ;
            return $http.post(MBS_DOMAIN + '/Settlement/order/orderList/'+ page +'/'+ key +'/'+ pageSize , {
                page : page,
                key : key,
                pageSize : pageSize
            })
        }

        //退款申请入口
        this.applyRefundFee = function( item ){
            return $http.post(MBS_DOMAIN + '/Settlement/Apply/applyRefundFee' , item );
        }

        //服务费退款
        this.saveService = function( item ){
            return $http.post(MBS_DOMAIN + '/Settlement/Apply/refundApplyService' , item );
        }

        //保存退款申请
        this.save = function( item ){
            return $http.post(MBS_DOMAIN + '/Settlement/Apply/refundApply  ' , item );
        }
}])

