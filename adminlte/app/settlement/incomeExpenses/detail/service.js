/**
 * @ngdoc service
 * @name 
 * @description
 * _Please update the description and dependencies._
 *
 * */
angular.module('settlement.incomeExpenses.detail.service',[])
    .service('incomeExpensesDetail', [ "$http" , "MBS_DOMAIN" , "$state",function( $http , MBS_DOMAIN ,$state ){

        this.get = function( paginationInfo , params ) {
            if (typeof(params.start_date) === "undefined") {
                date = new Date();
                defaultDate = date.getFullYear() + '-';
                defaultDate += (date.getMonth() + 1) + '-' + date.getDate();
                params.start_date = defaultDate;
            };
            return $http.post( MBS_DOMAIN + '/Settlement/IncomeExpenses/detail' , params )
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
            location.href = (MBS_DOMAIN + '/settlement/incomeExpenses/detail?' + para + '&download_form=true');
        }

        this.seal = function(params){
            return $http.post( MBS_DOMAIN + '/Settlement/SealInfo/seal' , params )
        }
        this.viewSealInfo = function(params){
            return $http.post( MBS_DOMAIN + '/Settlement/SealInfo/getSealInfo' , params )
        }
}])


