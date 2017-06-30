/**
 * @ngdoc service
 * @name 
 * @description
 * _Please update the description and dependencies._
 *
 * */
angular.module('settlement.contract.getContractByOrderNo.service',[])
    .service('contractDetail', [ "$http" , "MBS_DOMAIN" ,function( $http , MBS_DOMAIN ){
        this.get = function( order_no ) {
            return $http.post(MBS_DOMAIN + '/Settlement/Contract/getContractByOrderNo' , { order_no: order_no } );
        }

        //发送短信通知转账
        this.noticeTransfer = function( item ){
            return $http.post(MBS_DOMAIN + '/Settlement/Order/createAccount/', item );
        }
    }])