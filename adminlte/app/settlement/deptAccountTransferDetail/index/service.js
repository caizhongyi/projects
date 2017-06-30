/**
 * @ngdoc service
 * @name 
 * @description
 * _Please update the description and dependencies._
 *
 * */
angular.module('settlement.deptAccountTransferDetail.index.service',[])
    .service('transferDetail', [ "$http" , "MBS_DOMAIN" ,function( $http , MBS_DOMAIN ){
        this.get = function(paginationInfo, params) {
            return $http.post(MBS_DOMAIN + '/Settlement/DeptAccountTransferDetail/index/' + paginationInfo.currentPage + '/' + paginationInfo.pageSize, params);
        };
        this.update = function(item) {
            return $http.post(MBS_DOMAIN + '/Settlement/Finance/financePay', item );
        };
		/**
         * 暂停/启动
         * status 1
        * */
        this.deptAccountTransferDetail = function( item ){
            return $http.post(MBS_DOMAIN + '/Settlement/DeptAccountTransferDetail/setDeptAccountFee/' , item);
        }
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
            location.href = (MBS_DOMAIN + '/Settlement/DeptAccountTransferDetail/index/1?' + para + '&download=1' );
        }
}]);

