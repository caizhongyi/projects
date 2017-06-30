/**
 * @ngdoc service
 * @name 
 * @description
 * _Please update the description and dependencies._
 *
 * */
angular.module('chefubao.simulation.request.service',[])
    .service('request', [ "$http" , "MBS_DOMAIN" ,function( $http , MBS_DOMAIN ){
        this.get = function( item ) {
            return $http.post( MBS_DOMAIN + '/Chefubao/SimulationRequest/getOrderInfo/' , item )
        }

        //获取订单信息
        this.getOrderInfo = function( item ) {
            return $http.post( MBS_DOMAIN + '/Chefubao/SimulationRequest/getOrderInfo/' , item )
        }

        //上传签购单
        this.uploadSign = function( item ) {
            return $http.post( MBS_DOMAIN + '/Chefubao/SimulationRequest/uploadSign/' , item )
        }
        //支付通知
        this.payNotice  = function( item ) {
            return $http.post( MBS_DOMAIN + '/Chefubao/SimulationRequest/payNotice/' , item )
        }
        //订单列表
        this.getOrderList  = function( item ) {
            return $http.post( MBS_DOMAIN + '/Chefubao/V3SimulationRequest/getOrderList/' , item )
        }
        this.getTestEnvData = function() {
            return $http.post( MBS_DOMAIN + '/Chefubao/SimulationRequest/getTestEnvData/')
        }
        this.payRollbak = function( item ) {
            return $http.post( MBS_DOMAIN + '/Chefubao/SimulationRequest/payRollback/', item)
        }
}])