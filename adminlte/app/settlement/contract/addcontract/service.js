/**
 * @ngdoc service
 * @name 
 * @description
 * _Please update the description and dependencies._
 *
 * */
angular.module('settlement.contract.addContract.service',[])
    .service('contractEdit', [ "$http" , "MBS_DOMAIN" ,function( $http , MBS_DOMAIN ){
        this.get = function( order_no ) {
            return $http.post( MBS_DOMAIN + '/Settlement/Contract/addContract' , { order_no : order_no })
        }
        this.save = function( item ){
            return $http.post(MBS_DOMAIN + '/Settlement/Contract/saveContract ' , item );
        }
        this.getInfo = function( id ){
            return $http.post( MBS_DOMAIN + '/Settlement/Car/getInfo' , { id : id })
        }
        this.getRoleByPhoneNo = function( phone_no ){
            return $http.post( MBS_DOMAIN + '/Settlement/Role/getRoleByPhoneNo' , { phone_no : phone_no })
        }
        this.getInfoByZqContractId = function( id ){
            return $http.post( MBS_DOMAIN + '/Settlement/Contract/getInfoByZqContractId/' + id )
        }
        this.getInfoByZqOrderNo = function( order_no ){
            return $http.get( MBS_DOMAIN + '/settlement/Contract/getInfoByZqOrderNo/' + order_no )
        }
        //发送短信通知转账
        this.noticeTransfer = function( item ){
            return $http.post(MBS_DOMAIN + '/Settlement/Order/createAccount/', item );
        }
        //根据车型获得出厂价，huph@273.cn
        this.getModelInfo = function( modelId ){
            return $http.get('http://apipass.273.com.cn/Basicservice/Cache/getModelInfo/?model_id=' + modelId );
        }
    }])