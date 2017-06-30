/**
 * Created by DTO on 2015/4/27.
 * ?
 */
angular.module('settlement.finance.index', [
    'settlement.finance.index.service'
]).controller('controller.settlement.finance.index',
    ["$scope", "$rootScope", "$stateParams", "$modal", "$state",  "finance", "utils" , "financePrint","printUpdate",
        function ($scope, $rootScope, $stateParams, $modal, $state, finance, utils , financePrint, printUpdate) {
            $scope.utils = utils;
            $scope.finance = finance;
            $scope.showPayBar = false;
            $scope.selected = false;
            $scope.payCount = 0;
            $scope.paySum = 0;
            $scope.payItems = [];
            $scope.time = parseInt((new Date().getTime()) / 1000);
            $scope.selectAll = function() {
                for (var i = 0; i < $scope.list.length; i++) {
                    if ($scope.list[i].pay_status == 0 && $scope.list[i].autopay_status == 0) {
                        $scope.list[i].selected = $scope.selected;
                        $scope.payBar($scope.list[i]);
                    }
                }

            };

            $scope.reject = function(){
                var item = this.item;
                $modal.open({
                    templateUrl: "tpl-reject.html",
                    resolve: {
                        item: function () {
                            return item;
                        }
                    },
                    size: 'md',
                    controller: ["$scope", "$rootScope", "$modalInstance", "item", "$state", "$filter", "finance" ,
                        function ($scope, $rootScope, $modalInstance, item, $state, $filter, finance) {

                        $scope.submittedReject = false;
                        $scope.interacted = function( field ){
                            return  (field.$dirty && $scope.submittedReject) || field.isblur;
                        }
                        $scope.rejectSubmitAddForm = function ( isValid ) {
                            $scope.check_error = ""
                            if( isValid ){
                                $scope.submittedReject = true;
                                finance.reject({ id: item.id, type:'no', pay_check_note: $scope.reject_check_note }).success(function (res) {
                                    $scope.isError = false;
                                    if(res.code == 0){
                                        $modalInstance.dismiss('cancel');
                                        $state.reload();
                                    }else{
                                        $scope.submittedReject = false;
                                        $scope.check_error = res.msg;
                                    }
                                })
                            }
                        }
                        $scope.cancel = function () {
                            $modalInstance.dismiss('cancel');
                            //$state.reload();
                        }
                    }]
                });
            }
            $scope.selectItem = function() {
                $scope.payBar(this.item);
            }
            $scope.payBar = function(item) {
                if (item.selected) {
                    for (var i = 0; i < $scope.payItems.length; i++) {
                        if ($scope.payItems[i].id == item.id) {
                            return;
                        }
                    }
                    $scope.payItems.push(item);
                    $scope.payCount++;
                    $scope.paySum += item.fee;
                } else {
                    if ($scope.payItems.length == 0) return;
                    for (i = 0; i < $scope.payItems.length; i++) {
                        if ($scope.payItems[i].id == item.id) {
                            $scope.payItems.splice(i, 1);
                        }
                    }
                    $scope.payCount--;
                    $scope.paySum -= item.fee;
                }

            }
            $scope.batchPay = function() {
                var ids = "";
                for (i = 0; i < $scope.payItems.length; i++) {
                    if (ids == '') {
                        ids = $scope.payItems[i].id;
                    } else {
                        ids += ',' + $scope.payItems[i].id;
                    }
                }
                $state.go('settlement-finance-pay', {ids : ids});
            }
            $scope.autoPay = function() {
                console.log(this.item);
                $state.go('settlement-finance-pay', {ids : this.item.id});
            }
            $scope.autoPayInfo = function(){
                var item = this.item;
                $modal.open({
                    templateUrl: "tpl-autopay-info.html" ,
                    resolve: {
                        item: function () {
                            return item;
                        }
                    },
                    size:  'md',
                    controller:   [  "$scope", "$rootScope", "$modalInstance", "item", "$state", "$sce",  function($scope, $rootScope, $modalInstance, item, $state, $sce){
                        $scope.item = item;
                        $scope.item.autopay_note_trust = $sce.trustAsHtml($scope.item.autopay_note);
                        $scope.cancel = function(){
                            $modalInstance.dismiss('cancel');
                        }
                    }]

                });

            };
            $scope.pay = function(){
                var item = this.item;
                $modal.open({
                    templateUrl: "tpl-pay.html" ,
                    resolve: {
                        item: function () {
                            return item;
                        }
                    },
                    size:  'md',
                    controller:   [  "$scope", "$rootScope", "$modalInstance", "item", "$state", "$sce", "finance", "utils", function($scope, $rootScope, $modalInstance, item, $state, $sce , utils ){
                        $scope.item = item;
                        $scope.item.pay_time = new Date();
                        $scope.submitAddForm = function( isValid ) {
                            if (isValid && $scope.item) {
                                    finance.update( $scope.item ).success(function ( res ) {
                                        if (res.code == 0) {
                                            $scope.item.pay_status = 1;
                                            $scope.item.pay_status_txt = "已付款";
                                            $modalInstance.dismiss('cancel');
                                            angular.message('操作成功');
                                        } else {
                                            angular.message(res.msg);
                                        }
                                    }).error(function () {
                                        angular.message('服务器无响应！');
                                    })
                            }
                        }
                        $scope.cancel = function(){
                            $modalInstance.dismiss('cancel');
                        }
                    }]

                });

            };
            $scope.voucher = function(){
                var item = this.item;
                $modal.open({
                    templateUrl: "tpl-voucher.html" ,
                    resolve: {
                        item: function () {
                            return item;
                        }
                    },
                    size:  'md',
                    controller:   [  "$scope", "$rootScope", "$modalInstance", "item", "$state", "$sce", "finance", "utils", function($scope, $rootScope, $modalInstance, item, $state, $sce , utils ){
                        $scope.item = item;
                        $scope.item.pay_time = new Date();
                        $scope.item.add_voucher = 1;
                        $scope.submitAddForm = function( isValid ) {
                            if (isValid && $scope.item) {
                                finance.update($scope.item).success(function ( res ) {
                                    if (res.code == 0) {
                                        $modalInstance.dismiss('cancel');
                                        angular.message('操作成功');
                                    } else {
                                        angular.message(res.msg);
                                    }
                                }).error(function () {
                                    angular.message('服务器无响应！');
                                })
                            }
                        }
                        $scope.cancel = function(){
                            $modalInstance.dismiss('cancel');
                        }
                    }]

                });

            };
            $scope.errorReturn = function() {
                var item = this.item;
                $modal.open({
                    templateUrl: "tpl-errorReturn.html" ,
                    resolve: {
                        item: function () {
                            return item;
                        }
                    },
                    size:  'md',
                    controller:   [  "$scope", "$rootScope", "$modalInstance", "item", "$state", "$sce", "finance", "utils", function($scope, $rootScope, $modalInstance, item, $state, $sce , utils ){
                        $scope.item = item;
                        $scope.item.voucher ='';
                        $scope.item.pay_time ='';
                        $scope.submitErrorReturn = function( isValid ) {
                            if (isValid && $scope.item) {
                                finance.add( $scope.item ).success(function ( res ) {
                                    if (res.code == 0) {
                                        $scope.item.pay_status = 1;
                                        $scope.item.pay_status_txt = "已付款";
                                        $modalInstance.dismiss('cancel');
                                        angular.message('操作成功');
                                    } else {
                                        angular.message(res.msg);
                                    }
                                }).error(function () {
                                    angular.message('服务器无响应！');
                                })
                            }
                        }
                        $scope.cancel = function(){
                            $modalInstance.dismiss('cancel');
                        }
                    }]

                });
            };
            $scope.showExcel = function(){
                finance.excel($scope.searchCondition);
            }

            $scope.showPrint = function( data ) {
                var items = '', item = this.item;
                $modal.open({
                    templateUrl: "tpl-print.html",
                    resolve: {
                        item: function () {
                            return item;
                        },
                        items: function () {
                            return items;
                        }
                    },
                    size: 'lg',
                    controller: ["$scope","$rootScope","$modalInstance","item","$state","$sce" ,function ($scope,$rootScope,$modalInstance,item,$state,$sce ) {
                        $scope.searchCondition = {};
                        $scope.showAllPrint = function(){
                            financePrint.get(null ,$scope.searchCondition ).success(function(res){
                                if(typeof (res.data.list[0]) == 'undefined'){
                                    res.data.list = new Array();
                                };
                                $scope.items = res.data.list;
                                for(var i in $scope.items){
                                    $scope.items[i].chineseMoney = changeNumMoneyToChinese($scope.items[i].fee);
                                }
                            })
                        }
                        $scope.delItems = function(id){
                            for(var i in  $scope.items){
                                if(id == $scope.items[i].id){
                                    $scope.items.splice(i, 1);
                                }
                            }
                        }
                        $scope.delItem = function(id){
                            $scope.item = null;
                        }

                        $scope.item = item;
                        $scope.item.chineseMoney = changeNumMoneyToChinese(item.fee);

                        function changeNumMoneyToChinese(money) {
                            var cnNums = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"); //汉字的数字
                            var cnIntRadice = new Array("", "拾", "佰", "仟"); //基本单位
                            var cnIntUnits = new Array("", "万", "亿", "兆"); //对应整数部分扩展单位
                            var cnDecUnits = new Array("角", "分", "毫", "厘"); //对应小数部分单位
                            var cnInteger = "整"; //整数金额时后面跟的字符
                            var cnIntLast = "元"; //整型完以后的单位
                            var maxNum = 9999999999999.9999; //最大处理的数字
                            var IntegerNum; //金额整数
                            var DecimalNum; //金额小数部分
                            var ChineseStr = ""; //输出的中文金额字符串
                            var parts; //分离金额后用的数组，预定义

                            if (money == "") {
                                return "";
                            }
                            money = parseFloat(money);
                            if (money >= maxNum) {
                                return "";	//'超出最大处理数字'
                            }
                            if (money == 0) {
                                ChineseStr = cnNums[0] + cnIntLast + cnInteger;
                                return ChineseStr;
                            }
                            money = money.toString(); //转换为字符串
                            if (money.indexOf(".") == -1) {
                                IntegerNum = money;
                                DecimalNum = '';
                            } else {
                                parts = money.split(".");
                                IntegerNum = parts[0];
                                DecimalNum = parts[1].substr(0, 4);
                            }
                            if (parseInt(IntegerNum, 10) > 0) { //获取整型部分转换
                                var zeroCount = 0;
                                var IntLen = IntegerNum.length;
                                for (var i = 0; i < IntLen; i++) {
                                    var n = IntegerNum.substr(i, 1);
                                    var p = IntLen - i - 1;
                                    var q = p / 4;
                                    var m = p % 4;
                                    if (n == "0") {
                                        zeroCount++;
                                    } else {
                                        if (zeroCount > 0) {
                                            ChineseStr += cnNums[0];
                                        }
                                        zeroCount = 0; //归零
                                        ChineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
                                    }
                                    if (m == 0 && zeroCount < 4) {
                                        ChineseStr += cnIntUnits[q];
                                    }
                                }
                                ChineseStr += cnIntLast;
                            }
                            if (DecimalNum != '') { //小数部分
                                var decLen = DecimalNum.length;
                                for (var i = 0; i < decLen; i++) {
                                    var n = DecimalNum.substr(i, 1);
                                    if (n != '0') {
                                        ChineseStr += cnNums[Number(n)] + cnDecUnits[i];
                                    }
                                }
                            }
                            if (ChineseStr == '') {
                                ChineseStr += cnNums[0] + cnIntLast + cnInteger;
                            } else if (DecimalNum == '') {
                                ChineseStr += cnInteger;
                            }
                            return ChineseStr;
                        }
                        $scope.cancel = function () {
                            $modalInstance.dismiss('cancel');
                        };

                        $scope.printList = function(){

                            var strHtmInstall="<br><font color='#FF00FF'>打印控件未安装!点击这里<a href='http://att.273.com.cn/install_lodop32.exe' target='_self'>执行安装</a>,安装后请刷新页面或重新进入。</font>";
                            var strHtmUpdate="<br><font color='#FF00FF'>打印控件需要升级!点击这里<a href='http://att.273.com.cn/install_lodop32.exe' target='_self'>执行升级</a>,升级后请重新进入。</font>";
                            var strHtm64_Install="<br><font color='#FF00FF'>打印控件未安装!点击这里<a href='http://att.273.com.cn/install_lodop64.exe' target='_self'>执行安装</a>,安装后请刷新页面或重新进入。</font>";
                            var strHtm64_Update="<br><font color='#FF00FF'>打印控件需要升级!点击这里<a href='http://att.273.com.cn/install_lodop64.exe' target='_self'>执行升级</a>,升级后请重新进入。</font>";
                            var strHtmFireFox="<br><br><font color='#FF00FF'>注意：<br>1：如曾安装过Lodop旧版附件npActiveXPLugin,请在【工具】->【附加组件】->【扩展】中先卸它。</font>";
                            var LODOP=document.getElementById('LODOP_EM'), MESSAGE = document.getElementById('installMessage');
                            try{
                                if (navigator.appVersion.indexOf("MSIE")>=0)
                                    LODOP=document.getElementById('LODOP_OB');
                                if ((LODOP==null)||(typeof(LODOP.VERSION)=="undefined")) {
                                    if (navigator.userAgent.indexOf('Firefox')>=0)
                                        MESSAGE.innerHTML=strHtmFireFox;
                                    if (navigator.userAgent.indexOf('Win64')>=0){
                                        if (navigator.appVersion.indexOf("MSIE")>=0)
                                            document.write(strHtm64_Install);
                                        else
                                            MESSAGE.innerHTML=strHtm64_Install;
                                    } else {
                                        if (navigator.appVersion.indexOf("MSIE")>=0)
                                            document.write(strHtmInstall);
                                        else
                                            MESSAGE.innerHTML=strHtmInstall;
                                    }
                                } else if (LODOP.VERSION<"6.1.3.9") {
                                    if (navigator.userAgent.indexOf('Win64')>=0){
                                        if (navigator.appVersion.indexOf("MSIE")>=0)
                                            document.write(strHtm64_Update);
                                        else
                                            MESSAGE.innerHTML=strHtm64_Update;
                                    } else {
                                        if (navigator.appVersion.indexOf("MSIE")>=0)
                                            document.write(strHtmUpdate);
                                        else
                                            MESSAGE.innerHTML=strHtmUpdate;
                                    }
                                }
                            }catch(err){
                                if (navigator.userAgent.indexOf('Win64')>=0)
                                    MESSAGE.innerHTML="Error:"+strHtm64_Install;
                                else
                                    MESSAGE.innerHTML="Error:"+strHtmInstall;
                            }
                            LODOP.PRINT_INIT("网银付款审批单");
                            LODOP.NewPage();
                            LODOP.ADD_PRINT_HTM(60, 60,'100%','1280',document.getElementById("contain").innerHTML);
                            LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT",'Auto-Width');

                            var ids = '';
                            if(typeof($scope.items) != "undefined" && $scope.items.length > 0){
                                for(var i in  $scope.items){
                                    ids ? ids += '-':'';
                                    ids += $scope.items[i].id;
                                }
                            }else if($scope.item && typeof($scope.item.id) != "undefined" ){
                                ids = $scope.item.id;
                            }
                            ids = 'ids='+ids;
                            printUpdate.update(ids);

                            LODOP.PREVIEW();

                        }
                    }]
                });
            };
        }]);