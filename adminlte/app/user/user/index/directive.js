angular.module('user.user.index.directive',['ngMessages'])
    .directive("telephoneAvailableValidator",["$http", "MBS_DOMAIN", "$q", function($http, MBS_DOMAIN, $q) {
        return {
            require : 'ngModel',
            link : function(scope, element, attrs, ngModel) {
                // 异步调用 等待其他验证通过才执行该代码
                ngModel.$asyncValidators.telephoneAvailable1 = function(telephone) {
                    return $http.get(MBS_DOMAIN + '/User/Users/checkUniqueTelephone?telephone=' + telephone).
                        then(function resolved(result) {
                            var res = result.data;
                            if (res.code == 0) {
                                if (res.data) {
                                    // 手机号码已经存在， 验证失败， 给下一个promise传递失败通知
                                    return $q.reject('res.data');
                                } else {
                                    return true;  // 手机号码不存在 验证成功
                                }
                            }
                        });
                };
            }
        }
    }])
    .directive("selectDept", ["area", "$stateParams", "$timeout" , "utils", function(area , $stateParams , $timeout , utils ){
        return {
            require: '?ngModel',
            link: function( $scope, elm, attrs, ctrl ) {

                area.province().success(function( res ) {
                    if( res.code == 0 ){
                        $scope.province = res.data ;
                        if( $stateParams["province"] ) $timeout(function(){$province.trigger('change')})
                        $scope.$emit('provinceLoaded')
                    }
                    else{
                        utils.message( res.msg );
                    }
                }).error(function(){
                    //utils.message("无法访问！");
                })

                var $province = elm.find('.province') ;
                $province.on('change',function(){
                    var pro = new Function('$scope','return $scope.' + $province.attr('ng-model') )($scope);
                    if(pro)
                        area.city( pro ).success(function( res ) {
                            if( res.code == 0 ){
                                $scope.city  = res.data ;
                                $scope.shop = [];
                                if( $stateParams["city"] )  $timeout(function(){ $city.trigger('change')}) ;
                                $scope.$emit('cityLoaded')
                            }
                            else{
                                utils.message( res.msg );
                            }
                        }).error(function(){
                            //utils.message("无法访问！");
                        })
                })


                var $city = elm.find('.city')
                $city.on('change',function(){
                    var city = new Function('$scope','return $scope.' + $city.attr('ng-model') )($scope);
                    if(city)
                        area.shop( city ).success(function( res ) {
                            if( res.code == 0 ){
                                $scope.shop  = res.data ;
                                $scope.$emit('shopLoaded')
                            }
                            else{
                                utils.message( res.msg );
                            }
                        }).error(function(){
                            //utils.message("无法访问！");
                        })
                })

            }
        };
    }]);