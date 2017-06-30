/**
 * Created by Administrator on 2015/8/5.
 */
angular.module('chefubao.utils.filter', [])
    .filter('pay_channel' ,[ "$filter" ,function( $filter ){
        return function( val ){
            var name = '';
            switch(val){
                case 1 : name =  "POS收款-通联"; break;
                case 3 : name =  "POS收款-慧收款"; break;
                case 4 : name =  "转账收款"; break;
                case 5 : name =  "POS收款-乐收银(T0)"; break;
                case 6 : name =  "POS收款-乐收银(T1)"; break;
            }
            return  name;
        }
    }])
    .filter('pay_channel_string' ,[ "$filter" ,function( $filter ){
        return function( val ){
            var name = '';
            switch(val){
                case '1' : name =  "POS收款-通联"; break;
                case '3' : name =  "POS收款-慧收款"; break;
                case '4' : name =  "转账收款"; break;
                case '5' : name =  "POS收款-乐收银(T0)"; break;
                case '6' : name =  "POS收款-乐收银(T1)"; break;
            }
            return  name;
        }
    }])
