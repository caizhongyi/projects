/**
 * @ngdoc service
 * @name 
 * @description
 * _Please update the description and dependencies._
 *
 * */
angular.module('contract.contract.contractList.service',[])
    .service('jhccontract', [ "$http" , "MBS_DOMAIN" ,function( $http , MBS_DOMAIN ){
        this.get = function( paginationInfo , params ) {
            return $http.post( MBS_DOMAIN + '/Contract/Contract/contractList/'+ paginationInfo.currentPage +'/'+ paginationInfo.pageSize , params )
        }
        //作废
        this.remove = function(id){
            return $http.post(MBS_DOMAIN + '/Contract/Contract/setContractStatus/' + id + '/4');
        }
        //已作废的 重新生成
        this.reAdd = function(id){
            return $http.post(MBS_DOMAIN + '/Contract/Contract/reAddContract/' + id);
        }
        //删除草稿
        this.del = function(id){
            return $http.post(MBS_DOMAIN + '/Contract/Contract/delContract/' + id);
        }

        //导出exel 表格
        this.excel = function(params){
            var para = '';
            for(var i in params){
                if(typeof (params[i]) != "undefined" && params[i] != null){
                    if(para){
                        para += '&';
                    }
                    para += i + '=' + params[i];
                }
            }
            location.href = (MBS_DOMAIN + '/Contract/Contract/contractList/1/?' + para + '&download=1' );
            //location.href = (MBS_DOMAIN + '/Contract/Contract/contractList/' + '/?' + para + '&download=1' );
        }
}])

