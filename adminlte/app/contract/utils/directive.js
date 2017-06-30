/**
 * Created by Administrator on 2015/8/5.
 */

angular.module('contract.utils.directive', [
    "contract.utils.service"
])
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
    .directive("ungSelectUnit", [ '$parse' ,function ( $parse ) {
        return {
            require: '?ngModel',
            link: function ($scope, elm, attrs, ctrl) {
                attrs.ngOptions = "item.id as item.name for item in [{ id : 1 , name : '公里'},{ id : 2  , name : '英里'}]";
                if( attrs.ungSelectUnit ){
                    $parse( attrs.ngModel ).assign( $scope ,attrs.ungSelectUnit  );
                }
            }
        };
    }])
    .directive("ungSelectCertType", ["MBS_DOMAIN", "$timeout", "$parse", function ( MBS_DOMAIN, $timeout, $parse) {
        return {
            require: '?ngModel',
            link: function ($scope, elm, attrs, ctrl) {
                var $customInput = $( '[ng-model="'+ attrs.ungSelectCertType +'"]' );
                attrs.ngOptions = "item.value as item.name for item in [{ value : 1 , name : '身份证' },{ value : 2 , name : '组织机构代码证' },{ value : 3 , name : '护照' },{ value : 4 , name : '士官证' },{ value : 5 , name : '港奥通行证' },{ value : 6 , name : '其它（手填）' }]";
                if( $customInput.length )
                    $scope.$watch( attrs.ngModel , function( val ){
                        if( val == 6 ){
                            $customInput.show();
                        }
                        else{
                            $customInput.hide();
                        }
                    })
            }
        };
    }])
    .directive("selectCarType", ["contractUtils", function (contractUtils) {
        return {
            require: '?ngModel',
            link: function ($scope, elm, attrs, ctrl) {
                attrs.ngOptions = "item.type_id as item.name for item in carType";
                contractUtils.getCarType().success(function (res) {
                    $scope.carType = res.data;
                })
            }
        };
    }])