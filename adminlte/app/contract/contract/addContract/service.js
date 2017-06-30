/**
 * @ngdoc service
 * @name 
 * @description
 * _Please update the description and dependencies._
 *
 * */
angular.module('contract.contract.addContract.service',[])
    .service('addContract', [ "$http" , "MBS_DOMAIN" ,function( $http , MBS_DOMAIN ){
        this.add = function( item ){
            return $http.post(MBS_DOMAIN + '/Contract/Contract/addContract' , item );
        }
        this.update = function( item ){
            return $http.post(MBS_DOMAIN + '/Contract/Contract/updateContract' , item );
        }
        this.save = function( item ){
            if( item.id ){
                return this.update( item );
            }
            else{
                return this.add( item );
            }
        }
        this.getUserInfo = function(){
            return $http.post( MBS_DOMAIN + '/Contract/Contract/getUserInfo')
        }
        this.get = function( id ){
            return $http.get( MBS_DOMAIN + '/Contract/Contract/getContractById/' + id )
        }
        this.getInfoByOrderNo = function( id ) {
            return $http.post( MBS_DOMAIN + '/Contract/Contract/getInfoByOrderNo' , { order_no : id })
        }
        this.getOrderInfo = function(order_no){
            return $http.post( MBS_DOMAIN + '/Contract/Contract/getOrderInfo/' + order_no)
        }
}])

