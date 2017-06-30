/**
 * @ngdoc service
 * @name 
 * @description
 * _Please update the description and dependencies._
 *
 * */
angular.module('settlement.apply.applyFee.service',[])
    .service('applyFee', [ "$http" , "MBS_DOMAIN" ,function( $http , MBS_DOMAIN ){
        this.get = function( item ) {
            return $http.post( MBS_DOMAIN + '/Settlement/Apply/applyFee/' , item )
        }

        //车款申请
        this.carFeeApply = function( item ) {
            return $http.post( MBS_DOMAIN + '/Settlement/Apply/carFeeApply/' , item )
        }

        //服务费申请
        this.serviceFeeApply = function( item ) {
            return $http.post( MBS_DOMAIN + '/Settlement/Apply/serviceFeeApply/' , item )
        }
        //车款申请
        this.carToOtherApply  = function( item ) {
            return $http.post( MBS_DOMAIN + '/Settlement/Apply/carToOtherApply/' , item )
        }
        //车款申请
        this.brokerageApply  = function( item ) {
            return $http.post( MBS_DOMAIN + '/Settlement/Apply/brokerageApply/' , item )
        }

        this.getDeptAccountByDeptId  = function( item ) {
            return $http.get( MBS_DOMAIN + '/Settlement/Apply/getDeptAccountByDeptId/' + item.dept_id )
        }

        this.getPaBindByDeptId  = function( item ) {
            return $http.get( MBS_DOMAIN + '/Settlement/DeptAccount/getPaBindByDeptId/' + item.dept_id )
        }

        this.sendCode  = function( item  ) {
            return $http.post( MBS_DOMAIN + '/Settlement/DeptAccount/sendCode/?id=' + item.id , { phone_no : item.phone_no }  )
        }

        this.bindBankCard  = function( item ) {
            return $http.post( MBS_DOMAIN + '/Settlement/DeptAccount/bindBankCard/' , item )
        }
        // 申请车款
        this.applyCarFee = function( item ){
            return $http.post(MBS_DOMAIN + '/Settlement/Apply/applyFee' , item );
        }
        // 巨好车信息服务费
        this.jhcserviceFeeApply = function( item ){
            return $http.post(MBS_DOMAIN + '/Settlement/Apply/jhcServiceFeeApply' , item );
        }
        // 发送验证码，huph@273.cn
        this.sendCodeApply = function( type , orderNo ){
            return $http.get(MBS_DOMAIN + '/Settlement/Common/sendCodeApply/' + type + '/' + orderNo);
        }
        // 免发验证码，huph@273.cn
        this.avoidCode = function( type , orderNo ){
            return $http.get(MBS_DOMAIN + '/Settlement/Common/avoidSend/' + type + '/' + orderNo);
        }
}])