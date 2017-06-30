/**
 * Created by Administrator on 2015/8/5.
 */

angular.module('chefubao.utils.directive', [

]).directive("selectDeptSumStatus", [function () {
        return {
            require: '?ngModel',
            link: function ($scope, elm, attrs, ctrl) {
                attrs.ngOptions = "item.id as item.name for item in [{ id : 0 , name : '全部'},{ id : 1  , name : '异常'},{ id : 2 , name : '正常'}]";
            }
        };
    }])
    .directive("selectPayChannel", [function () {
        return {
            require: '?ngModel',
            link: function ($scope, elm, attrs, ctrl) {
                attrs.ngOptions = "item.id as item.name for item in [{ id : 3 , name : 'POS收款'}, { id : 4 , name : '转账收款'}]";
            }
        };
    }])
    .directive("selectBank", ["$http", "MBS_DOMAIN", function ($http, MBS_DOMAIN) {
        return {
            require: '?ngModel',
            link: function ($scope, elm, attrs, ctrl) {
                attrs.ngOptions = "item.id as item.name for item in [{ id : 1 , name : '中国民生银行福州长乐支行'},{ id : 2, name : '平安银行福州支行'},{ id : 3, name : '民生银行收单'}]";
                /* attrs.ngOptions = "item.value as item.name for item in orderStatus" ;
                 utils.getAllStatus().success(function( res ){
                 $scope.orderStatus = res.data ;
                 })*/
            }
        }
    }])
    .directive("selectChannel", ["$http", "MBS_DOMAIN", function ($http, MBS_DOMAIN) {
        return {
            require: '?ngModel',
            link: function ($scope, elm, attrs, ctrl) {
                attrs.ngOptions = "item.id as item.name for item in [{ id : 1 , name : '通联'},{ id : 3, name : '慧收款'}]";
                /* attrs.ngOptions = "item.value as item.name for item in orderStatus" ;
                 utils.getAllStatus().success(function( res ){
                 $scope.orderStatus = res.data ;
                 })*/
            }
        }
    }])
    .directive("selectPayChannelType", [function () {
        return {
            require: '?ngModel',
            link: function ($scope, elm, attrs, ctrl) {
                attrs.ngOptions = "item.id as item.name for item in [{ id : 3 , name : 'POS收款-慧收款'}, { id : 4 , name : '智能收款'},{ id : 5 , name : 'POS收款-乐收银(T0)'},{ id : 6 , name : 'POS收款-乐收银(T1)'}]";
            }
        };
    }])