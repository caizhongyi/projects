/**
 * Created by Administrator on 2015/8/5.
 */

angular.module('contract.utils.service',[])
    .service('contractUtils', [ "$http" , "MBS_DOMAIN" ,function( $http , MBS_DOMAIN ){
        this.getAllStatus = function(){
            return $http.post(MBS_DOMAIN + '/Settlement/Order/getAllStatus');
        }
        this.getAllCertType = function(){
            return $http.post(MBS_DOMAIN + '/Settlement/Contract/getAllCertType');
        }
        this.updateSignImg = function(item) {
            return $http.post(MBS_DOMAIN + '/Settlement/DeptAccountTransferDetail/updateSignImg', item );
        };

        this.getBanks = function(){
            return $http.get(MBS_DOMAIN)
        }
			
        this.getCarType = function(){
            return $http.get(MBS_DOMAIN + '/Basicservice/Cache/getCarTypeNameList');
        }
    }])