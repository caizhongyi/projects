/**
 * Created by Administrator on 2015/8/5.
 */

angular.module('settlement.utils.directive', [
    "settlement.utils.service"
])
    .directive("selectStore", ["area", "$stateParams", "$timeout", "cache", "$parse", "utils", function (area, $stateParams, $timeout, cache, $parse, utils) {
        return {
            require: '?ngModel',
            link: function ($scope, elm, attrs, ctrl) {
                if (cache.get('province')) {
                    $scope.province = cache.get('province');
                    if ($stateParams["province"]) $timeout(function () {
                        $province.trigger('change')
                    })
                }
                else {
                    area.province().success(function (res) {
                        if (res.code == 0) {
                            $scope.province = res.data;
                            cache.set('province', res.data);
                            if ($stateParams["province"]) $timeout(function () {
                                $province.trigger('change')
                            })
                            $scope.$emit('provinceLoaded')
                        }
                        else {
                            utils.message(res.msg);
                        }
                    }).error(function () {
                        //utils.message("无法访问核");
                    })
                }

                var $province = elm.find('.province'), $city = elm.find('.city'), $shop = elm.find('.shop');

                $scope.$watch($province.attr('ng-model'), function (val) {
                    var pro = val;
                    if (pro) {
                        if (cache.get('city' + pro)) {
                            $scope.city = cache.get('city' + pro);
                            if ($stateParams["city"])  $timeout(function () {
                                $city.trigger('change')
                            });
                        }
                        else {
                            area.city(pro).success(function (res) {
                                if (res.code == 0) {
                                    $scope.city = res.data;
                                    $scope.shop = [];
                                    ;
                                    cache.set('city' + pro, res.data);
                                    if ($stateParams["city"])  $timeout(function () {
                                        $city.trigger('change')
                                    });
                                    $scope.$emit('cityLoaded')
                                }
                                else {
                                    utils.message(res.msg);
                                }
                            }).error(function () {
                                //utils.message("无法访问核");
                            })
                        }
                    }
                    else {
                        $scope.city = $scope.shop = [];
                        new Function('$scope', 'return $scope.' + $city.attr('ng-model') + '= null ')($scope);
                        new Function('$scope', 'return $scope.' + $shop.attr('ng-model') + '= null ')($scope);
                    }
                })

                $scope.$watch($city.attr('ng-model'), function (val) {
                    var city = val;
                    if (city) {
                        if (cache.get('shop' + city)) {
                            $scope.shop = cache.get('shop' + city);
                        }
                        else {
                            area.shop(city).success(function (res) {
                                if (res.code == 0) {
                                    $scope.shop = res.data;
                                    cache.set('shop' + city, res.data)
                                    $scope.$emit('shopLoaded')
                                }
                                else {
                                    utils.message(res.msg);
                                }
                            }).error(function () {
                                //utils.message("无法访问核");
                            })
                        }
                    }
                    else {
                        $scope.shop = [];
                        new Function('$scope', 'return $scope.' + $shop.attr('ng-model') + '= null ')($scope);
                    }
                })

            }
        };
    }])
    .directive("ungSelectProvince", ["area", "$stateParams", "$timeout", "cache", "$parse", "utils", function (area, $stateParams, $timeout, cache, $parse, utils) {
        return {
            require: '?ngModel',
            link: function ($scope, elm, attrs, ctrl) {
                var ngModelString = attrs['ngModel'].replace('.','') + 'Array',
                    ngModelStringCache = ngModelString + 'Cache';
                attrs.ngOptions = "o.id as o.name for o in " + ngModelString;

                if( cache.get(ngModelStringCache) ){
                    $parse(ngModelString).assign( $scope, cache.get(ngModelStringCache) );
                    return ;
                }

                area.province().success(function (res) {
                    if (res.code == 0) {
                        $timeout(function () {
                            var data = res.data ;
                            $parse(ngModelString).assign( $scope, data );
                            cache.set( ngModelStringCache  , data );
                            $scope.$apply();
                        });
                    }
                    else {
                        utils.message(res.msg);
                    }
                }).error(function () {
                    //utils.message("无法访问核");
                })
            }
        };
    }])
    .directive("ungSelectCity", ["area", "$stateParams", "$timeout", "cache", "$parse", "utils", function (area, $stateParams, $timeout, cache, $parse, utils) {
        return {
            require: '?ngModel',
            link: function ($scope, elm, attrs, ctrl) {
                if (!attrs['ungSelectCity']) {
                    window.console && console.error('not find ungSelectCity model!');
                    return ;
                }
                var ngModelString = attrs['ngModel'].replace('.','') + 'Array',
                    ngModelStringCache = ngModelString + 'Cache';
                attrs.ngOptions = "o.id as o.name for o in " + ngModelString;


                var $province = $('[ng-model="'+ attrs['ungSelectCity'] +'"]').click(function(){
                    $(this).data('isClick' , true );
                })

                $scope.$watch(attrs['ungSelectCity'], function ( newValue , oldValue ) {
                    var shopModelString = elm.data('shop-model'),
                        saleManModelString = elm.data('saleman-model');
                    var ngTarget = $parse(attrs['ungSelectCity'])($scope), cacheData = cache.get( ngModelStringCache ) || {};

                    //    console.log(elm.data('isClick'));
                    if( $province.data('isClick') ) {
                        if (newValue != oldValue ) {
                            $parse(attrs['ngModel']).assign($scope, '');
                            $parse(ngModelStringCache.replace('.', '') + 'Array').assign($scope, '');
                        }

                        if (shopModelString && oldValue) {
                            $parse(shopModelString).assign($scope, '');
                            $parse(shopModelString.replace('.', '') + 'Array').assign($scope, '');

                        }
                        if (saleManModelString && oldValue) {
                            $parse(saleManModelString).assign($scope, '');
                            $parse(saleManModelString.replace('.', '') + 'Array').assign($scope, '');
                        }
                        $province.removeData('isClick');
                    }
                    if( cacheData[ngTarget] ){
                        $parse(ngModelString).assign( $scope, cacheData[ngTarget] );
                    }
                    else{
                        if (ngTarget)
                            area.city(ngTarget).success(function (res) {
                                if (res.code == 0) {
                                    var data = res.data, cacheData = cache.get( ngModelStringCache ) || {} ;
                                    $parse(ngModelString).assign( $scope, data );
                                    cacheData[ngTarget] = data;
                                    cache.set( ngModelStringCache  , cacheData );
                                }
                                else {
                                    utils.message(res.msg);
                                }
                            }).error(function () {
                                //utils.message("无法访问核");
                            })
                    }
                })
            }
        };
    }])
    .directive("ungSelectShop", ["area", "$stateParams", "$timeout", "cache", "$parse", "utils", function (area, $stateParams, $timeout, cache, $parse, utils) {
        return {
            require: '?ngModel',
            link: function ($scope, elm, attrs, ctrl) {
                if (!attrs['ungSelectShop']) {
                    window.console && console.error('not find ungSelectShop model!');
                    return ;
                }
                var ngModelString = attrs['ngModel'].replace('.','') + 'Array',
                    ngModelStringCache = ngModelString + 'Cache',
                    $ngParent  = $('[ng-model="'+ attrs['ungSelectShop'] +'"]').data('shop-model' , attrs['ngModel'] );
                // $ngParentParent  = $('[ng-model='+ $ngParent.attr('ungSelectCity') +']');

                attrs.ngOptions = "o.id as o.name for o in " + ngModelString;

                var $shop = $('[ng-model="'+ attrs['ungSelectShop'] +'"]').click(function(){
                    $(this).data('isClick' , true );
                })

                $scope.$watch(attrs['ungSelectShop'], function ( newValue , oldValue ) {
                    var ngTarget = $parse(attrs['ungSelectShop'])($scope), cacheData = cache.get( ngModelStringCache ) || {};

                    var saleManModelString = elm.data('saleman-model')
                    if( $shop.data('isClick') ){

                        if( newValue != oldValue ){
                            $parse( attrs['ngModel'] ).assign($scope,'');
                            $parse(ngModelStringCache.replace('.','') + 'Array').assign($scope,'');
                        }
                        if(saleManModelString && oldValue){
                            $parse(saleManModelString).assign($scope,'');
                            $parse(saleManModelString.replace('.','') + 'Array').assign($scope,'');
                        }
                        $shop.removeData('isClick');
                    }

                    if( cacheData[ngTarget] ){
                        $parse(ngModelString).assign( $scope, cacheData[ngTarget] );
                    }
                    else {
                        if (ngTarget)
                            area.shop(ngTarget).success(function (res) {
                                if (res.code == 0) {
                                    var data = res.data, cacheData = cache.get( ngModelStringCache ) || {} ;
                                    $parse(ngModelString).assign( $scope, data );
                                    cacheData[ngTarget] = data;
                                    cache.set( ngModelStringCache  , cacheData );
                                }
                                else {
                                    utils.message(res.msg);
                                }
                            }).error(function () {
                                //utils.message("无法访问核");
                            })
                    }
                })
            }
        };
    }])
    .directive("ungSelectSaleMan", ["area", "$stateParams", "$timeout", "cache", "$parse", "utils", function (area, $stateParams, $timeout, cache, $parse, utils) {
        return {
            require: '?ngModel',
            link: function ($scope, elm, attrs, ctrl) {
                if (!attrs['ungSelectSaleMan']) {
                    window.console && console.error('not find ungSelectSaleMan model!');
                    return ;
                }
                var ngModelString = attrs['ngModel'].replace('.','') + 'Array',
                    ngModelStringCache = ngModelString + 'Cache',
                    $ngParent  = $('[ng-model="'+ attrs['ungSelectSaleMan'] +'"]').data('saleman-model' , attrs['ngModel']),
                    $ngParentParent  = $('[ng-model="'+ $ngParent.attr('ung-select-shop') +'"]').data('saleman-model' , attrs['ngModel'] );
                attrs.ngOptions = "o.id as o.real_name for o in " + ngModelString;
                var $tracer = $('[ng-model="'+ attrs['ungSelectSaleMan'] +'"]').click(function(){
                    $(this).data('isClick' , true );
                })
                $scope.$watch(attrs['ungSelectSaleMan'], function ( newValue , oldValue ) {
                    var ngTarget = $parse(attrs['ungSelectSaleMan'])($scope), cacheData = cache.get( ngModelStringCache ) || {};

                    if( $tracer.data('isClick') ){
                        if( newValue != oldValue){
                            $parse( attrs['ngModel'] ).assign($scope,'');
                            $parse(ngModelStringCache.replace('.','') + 'Array').assign($scope,'');
                        }
                        $tracer.removeData('isClick');

                    }

                    if( cacheData[ngTarget] ){
                        $parse(ngModelString).assign( $scope, cacheData[ngTarget] );
                    }
                    else {
                        if (ngTarget)
                            area.saleMan(ngTarget).success(function (res) {
                                if (res.code == 0) {
                                    var data = res.data, cacheData = cache.get( ngModelStringCache ) || {} ;
                                    $parse(ngModelString).assign( $scope, data );
                                    cacheData[ngTarget] = data;
                                    cache.set( ngModelStringCache  , cacheData );
                                }
                                else {
                                    utils.message(res.msg);
                                }
                            }).error(function () {
                                //utils.message("无法访问核");
                            })
                    }
                })
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
    .directive("selectCardType", ["$http", "MBS_DOMAIN", function ($http, MBS_DOMAIN) {
        return {
            require: '?ngModel',
            link: function ($scope, elm, attrs, ctrl) {
                attrs.ngOptions = "item.id as item.name for item in [{ id : -1 , name : '未识别'},{ id : 0, name : '借记卡'},{ id : 1, name : '信用卡'},{ id : 2, name : '准贷记卡'}]";
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
                attrs.ngOptions = "item.id as item.name for item in [{ id : 1 , name : '通联'},{ id : 3, name : 'POS刷卡'}]";
                /* attrs.ngOptions = "item.value as item.name for item in orderStatus" ;
                 utils.getAllStatus().success(function( res ){
                 $scope.orderStatus = res.data ;
                 })*/
            }
        }
    }])
    .directive("selectPayStatus", ["$http", "MBS_DOMAIN", function ($http, MBS_DOMAIN) {
        return {
            require: '?ngModel',
            link: function ($scope, elm, attrs, ctrl) {
                attrs.ngOptions = "item.id as item.name for item in [{ id : 0 , name : '未付款'},{ id : 1, name : '已付款'},{ id : 9, name : '财务拒绝'},{ id : 99, name : '付款失败'}]";
                /* attrs.ngOptions = "item.value as item.name for item in orderStatus" ;
                 utils.getAllStatus().success(function( res ){
                 $scope.orderStatus = res.data ;
                 })*/
            }
        }
    }])
    .directive("selectCompany", ["$http", "MBS_DOMAIN", function ($http, MBS_DOMAIN) {
        return {
            require: '?ngModel',
            link: function ($scope, elm, attrs, ctrl) {
                attrs.ngOptions = "item.id as item.name for item in [{ id : 0 , name : '福州车友网络科技有限公司'} ]";
                /* attrs.ngOptions = "item.value as item.name for item in orderStatus" ;
                 utils.getAllStatus().success(function( res ){
                 $scope.orderStatus = res.data ;
                 })*/
            }
        };
    }])
    .directive("selectOrderStatus", ["$http", "MBS_DOMAIN", "$timeout", "cache", 'settlementUtils', function ($http, MBS_DOMAIN, $timeout, cache, settlementUtils) {
        return {
            require: '?ngModel',
            link: function ($scope, elm, attrs, ctrl) {
                // attrs.ngOptions = "item.id as item.name for item in [{ id : 0 , name : '待收核'},{ id : 0 , name : '部分收款'},{ id : 2 , name : '已收款完核'},{ id : 3 , name : '订单结束'},{ id : 4 , name : '订单取消'}]";
                attrs.ngOptions = "item.value as item.name for item in orderStatus";
                if (!$scope.orderStatus) {
                    $timeout(function () {
                        if (cache.get('orderStatus')) {
                            $scope.orderStatus = cache.get('orderStatus')
                        }
                        else {
                            settlementUtils.getAllStatus().success(function (res) {
                                $scope.orderStatus = res.data;
                                cache.set('orderStatus', res.data)
                            })
                        }
                    })
                }
            }
        };
    }])
    .directive("selectFeeStatus", [function () {
        return {
            require: '?ngModel',
            link: function ($scope, elm, attrs, ctrl) {
                attrs.ngOptions = "item.id as item.name for item in [ { id : 2 , name : '暂停'},{ id : 1 , name : '正常'}]";
            }
        };
    }])
    .directive("selectDeptStatus", [function () {
        return {
            require: '?ngModel',
            link: function ($scope, elm, attrs, ctrl) {
                attrs.ngOptions = "item.id as item.name for item in [{ id : 0 , name : '待店长审核'},{ id : 0 , name : '店长已审核'},{ id : 2 , name : '待财务审核'},{ id : 3 , name : '店长驳回'},{ id : 4 , name : '财务驳回'}]";
            }
        };
    }])
    .directive("selectPayType", [function () {
        return {
            require: '?ngModel',
            link: function ($scope, elm, attrs, ctrl) {
                attrs.ngOptions = "item.id as item.name for item in [{ id : 1 , name : '车款'},{ id : 2 , name : '服务费'},{ id : 3 , name : '车款转其他'},{ id : 4 , name : '退款'},{ id : 5 , name : '信息服务费（公司）'}]";
            }
        };
    }])
    .directive("selectCertType", ["settlementUtils", "MBS_DOMAIN", "$timeout", "cache", function (settlementUtils, MBS_DOMAIN, $timeout, cache) {
        return {
            require: '?ngModel',
            link: function ($scope, elm, attrs, ctrl) {
                attrs.ngOptions = "item.value as item.name for item in selectCertType";
                $timeout(function () {
                    if (cache.get('certType')) {
                        $scope.selectCertType = cache.get('certType')
                    }
                    else {
                        settlementUtils.getAllCertType().success(function (res) {
                            $scope.selectCertType = res.data;
                            cache.set('certType', res.data)
                        })
                    }
                })
            }
        };
    }])
    .directive("selectContractStatus", [function () {
        return {
            require: '?ngModel',
            link: function ($scope, elm, attrs, ctrl) {
                attrs.ngOptions = "item.id as item.name for item in [{ id : 0  , name : '未完善'},{ id : 1  , name : '已完善待审核'},{ id : 2 , name : '已审核'},{ id : 3 , name : '已拒绝'}]";
            }
        };
    }])
    //刷卡通道
    .directive("selectSourceType", ["$http", "MBS_DOMAIN", "utils", function ($http, MBS_DOMAIN, utils) {

        return {
            require: '?ngModel',
            link: function ($scope, elm, attrs, ctrl) {
                attrs.ngOptions = "item.id as item.name for item in [{ id : 1 , name : '刷卡手续费充值'},{ id : 2 , name : '扣门店刷卡手续费'},{ id : 3, name : '奖励'},{ id : 4 , name : '刷卡手续费余额退回'},{ id : 5 , name : '收客户刷卡手续费'} ]";
                /* attrs.ngOptions = "item.value as item.name for item in orderStatus" ;
                 utils.getAllStatus().success(function( res ){
                 $scope.orderStatus = res.data ;
                 })*/
            }
        };
    }])
    .directive("selectApplyStatus", [function () {
        return {
            require: '?ngModel',
            link: function ($scope, elm, attrs, ctrl) {
                attrs.ngOptions = "item.id as item.name for item in [{ id : 0 , name : '待店长审核'},{ id : 1  , name : '店长已审核,待财务审核'},{ id : 2 , name : '财务已审核'},{ id : 3, name : '店长驳回'},{ id : 4, name : '财务驳回'}]";
            }
        };
    }])
    .directive("selectCarType", ["settlementUtils", function (settlementUtils) {
        return {
            require: '?ngModel',
            link: function ($scope, elm, attrs, ctrl) {
                attrs.ngOptions = "item.type_id as item.name for item in carType";
                settlementUtils.getCarType().success(function (res) {
                    $scope.carType = res.data;
                })
            }
        };
    }])
    .directive("selectApplyType", [function () {
        return {
            require: '?ngModel',
            link: function ($scope, elm, attrs, ctrl) {
                attrs.ngOptions = "item.id as item.name for item in [{ id : 1 , name : '车款'},{ id : 2  , name : '服务费'},{ id : 3, name : '车款转其他'},{ id : 4, name : '退款'},{ id : 5, name : '信息服务费'}, { id : 6 , name : '代收刷卡手续费'}, { id : 7 , name : '错误退回'}, { id : 8 , name : '巨好车预付款'}, { id : 9 , name : '平台服务费'}]";
            }
        };
    }])
    .directive("selectOrderType", [function () {
        return {
            require: '?ngModel',
            link: function ($scope, elm, attrs, ctrl) {
                attrs.ngOptions = "item.id as item.name for item in [{ id : 0 , name : '普通业务'}, { id : 1 , name : '巨好车业务'}]";
            }
        };
    }])
    .directive("selectYesOrNo", [function () {
        return {
            require: '?ngModel',
            link: function ($scope, elm, attrs, ctrl) {
                attrs.ngOptions = "item.id as item.name for item in [{ id : 1 , name : '否'}, { id : 2 , name : '是'}]";
            }
        };
    }])
    .directive("selectPayChannelType", [function () {
        return {
            require: '?ngModel',
            link: function ($scope, elm, attrs, ctrl) {
                attrs.ngOptions = "item.id as item.name for item in [{ id : 3 , name : 'POS收款-慧收款'}, { id : 4 , name : '转账收款'},{ id : 5 , name : 'POS收款-乐收银(T0)'},{ id : 6 , name : 'POS收款-乐收银(T1)'}]";
            }
        };
    }])
    .directive("modalSignInfo", ["$modal", "fileupload", "settlementUtils", function ($modal, fileupload, settlementUtils) {
        return {
            require: '?ngModel',
            link: function ($scope, elm, attrs, ctrl) {
                var item = $scope.item;
                elm.click(function () {
                    $modal.open({
                        //    templateUrl: "tpl-sign-info.html",
                        template: '  <div class="modal-header">\
                        <button aria-label="Close" data-dismiss="modal" class="close" type="button" ng-click="cancel()"><span aria-hidden="true">×</span></button>\
                        <h3 class="modal-title">查看签购单</h3>\
                        </div>\
                        <div class="modal-body">\
                        <span class="btn btn-primary btn-file modv2-btn" ngf-select ngf-drop ng-model="signImg" ng-model-rejected="rejFiles"\
                        ngf-multiple="false" ngf-accept="accept" accept="image/*"\
                        ng-disabled="disabled" ngf-capture="capture"\
                        ngf-drag-over-class="{accept:\'dragover\', reject:\'dragover-err\', delay:100}"\
                        ngf-min-size="minSize" ngf-max-size="maxSize"\
                        ngf-keep="false" ngf-keep-distinct="true"\
                        ngf-reset-model-on-click="resetModelOnClick"\
                        ngf-allow-dir="allowDir" class="drop-box" ngf-drop-available="dropAvailable" ng-show="!item.sign_url">上传照片</span>\
                        <img ng-show="item.sign_url" width="400" src="{{item.sign_url}}" />\
                        </div>\
                        <div class="modal-footer">\
                        <button class="btn btn-primary modv2-btn" ng-click="cancel()">确定</button>\
                        </div>',
                        resolve: {
                            item: function () {
                                return item;
                            }
                        },
                        size: 'md',
                        controller: ["$scope", "$rootScope", "$modalInstance", "item", "$state", "$sce", function ($scope, $rootScope, $modalInstance, item, $state, $sce) {
                            $scope.item = item;
                            $scope.item.autopay_note = $sce.trustAsHtml($scope.item.autopay_note);
                            $scope.cancel = function () {
                                $modalInstance.dismiss('cancel');
                            }

                            $scope.$watch('signImg', function (files) {
                                fileupload.upload(files, function (file, res) {
                                    //console.log(file,res);
                                    settlementUtils.updateSignImg({
                                        order_no: $scope.item.order_no,
                                        voucher_no: $scope.item.voucher_no,
                                        sign_url: res.data.url
                                    }).success(function () {
                                        $scope.item.sign_url = res.data.url;
                                    });
                                });
                            });
                        }]

                    });
                })
            }
        };
    }])
    .directive("selectDepositPayType", [function () {
        return {
            require: '?ngModel',
            link: function ($scope, elm, attrs, ctrl) {
                attrs.ngOptions = "item.id as item.name for item in [{ id : 0  , name : '民生转账'},{ id : 1  , name : '智能转账'}]";
            }
        };
    }])
