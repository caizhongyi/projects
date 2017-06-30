/**
 * Created by Administrator on 2015/8/5.
 */
angular.module('settlement.utils.filter', [])
    .filter('cardType' ,[ "$filter" ,function( $filter ){
        return function( val ){
            var name = ''
            switch(val){
                case -1 : name =  "未识别"; break;
                case 0 : name =  "借记卡"; break;
                case 1 : name =  "信用卡"; break;
                case 2 : name =  "准信用卡"; break;
            }
            return  name;
        }
    }])
    .filter('feeType' ,[ "$filter" ,function( $filter ){
        return function( val ){
            var name = ''
            switch(val){
                case 1 : name =  "车款"; break;
                case 2 : name =  "服务费"; break;
                case 3 : name =  "车款转其他"; break;
                case 4 : name =  "退款"; break;
                case 5 : name =  "信息服务费（公司）"; break;
                case 7 : name =  "错误退回"; break;
                case 8 : name =  "巨好车预付款"; break;
                case 9 : name =  "平台信息服务费申请"; break;
            }
            return  name;
        }
    }])
    .filter('status', [ "$filter" ,function( $filter ){
        return function( val ){
            var name = ''
            switch(val){
                case 0 : name =  "未付款"; break;
                case 1 : name =  "已付款"; break;
                case 9 : name =  "财务拒绝"; break;
                case 99 : name =  "付款失败"; break;
            }
            return  name;
        }
    }])
    .filter('contract_status', [ "$filter" ,function( $filter ){
        return function( val ){
            var name = '';
            switch(val){
                case 0 : name =  "未完善"; break;
                case 1 : name =  "已完善待审核"; break;
                case 2 : name =  "已审核"; break;
                case 3 : name =  "已拒绝"; break;
            }
            return  name;
        }
    }])
    .filter('dept_type', [ "$filter" ,function( $filter ){
        return function( val ){
            var name = ''
            switch(val){
                case 1 : name =  "直营店"; break;
                case 2 : name =  "加盟店"; break;
            }
            return  name;
        }
    }])
    .filter('pay_status' ,[ "$filter" ,function( $filter ){
        return function( val ){
            var name = ''
            switch(val){
                case 0 : name =  "未收"; break;
                case 1 : name =  "已收"; break;
            }
            return  name;
        }
    }])
    .filter('order_type' ,[ "$filter" ,function( $filter ){
        return function( val ){
            var name = ''
            switch(val){
                case 0 : name =  "普通业务"; break;
                case 1 : name =  "巨好车业务"; break;
            }
            return  name;
        }
    }])
    .filter('pay_channel' ,[ "$filter" ,function( $filter ){
        return function( val ){
            var name = ''
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
            var name = ''
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
    .filter('toFixed' ,[ "$filter" ,function( $filter ){
        return function( val ){
            return val.toFixed(2);
        }
    }])
    .filter('pay_type' ,[ "$filter" ,function( $filter ){
        return function( val ){
            var name = ''
            switch(val){
                case 0 : name =  "民生转账"; break;
                case 1 : name =  "智能转账"; break;
            }
            return  name;
        }
    }])
