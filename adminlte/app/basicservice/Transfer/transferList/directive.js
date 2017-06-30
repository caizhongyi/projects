angular.module('basicservice.Transfer.transferList.directive', [
    "basicservice.Transfer.transferList.service"
])
    .directive("selectStore" , [ "area","$stateParams" ,"$timeout" ,"cache", "$parse" ,function( area , $stateParams , $timeout , cache , $parse){
        return {
            require: '?ngModel',
            link: function( $scope, elm, attrs, ctrl ) {

                if( cache.get('province') ){
                    $scope.province = cache.get('province');
                    if( $stateParams["province"] ) $timeout(function(){$province.trigger('change')})
                }
                else{
                    area.province().success(function( res ) {
                        if( res.code == 0 ){
                            $scope.province = res.data ;
                            cache.set('province' , res.data );
                            if( $stateParams["province"] ) $timeout(function(){$province.trigger('change')})
                            $scope.$emit('provinceLoaded')
                        }
                        else{
                            angular.message( res.msg );
                        }
                    }).error(function(){
                        //angular.message("无法访问核");
                    })
                }

                var $province = elm.find('.province'), $city = elm.find('.city'),$shop = elm.find('.shop'), $user = elm.find('.user') ;

                $scope.$watch( $province.attr('ng-model'), function( val ){
                    var pro = val ;
                    if(pro){
                        if( cache.get('city' + pro ) ){
                            $scope.city = cache.get('city' + pro ) ;
                            if( $stateParams["city"] )  $timeout(function(){ $city.trigger('change')}) ;
                        }
                        else{
                            area.city( pro ).success(function( res ) {
                                if( res.code == 0 ){
                                    $scope.city  = res.data ;
                                    $scope.shop = []; ;
                                    cache.set('city'+ pro , res.data );
                                    if( $stateParams["city"] )  $timeout(function(){ $city.trigger('change')}) ;
                                    $scope.$emit('cityLoaded')
                                }
                                else{
                                    angular.message( res.msg );
                                }
                            }).error(function(){
                                //angular.message("无法访问核");
                            })
                        }
                    }
                    else{
                        $scope.city = $scope.shop  = [];
                        new Function('$scope','return $scope.' + $city.attr('ng-model') + '= null ' )($scope);
                        new Function('$scope','return $scope.' + $shop.attr('ng-model') + '= null ')($scope);
                    }
                })

                $scope.$watch( $city.attr('ng-model'), function( val ){
                    var city = val;
                    if(city){
                        if( cache.get('shop' + city ) ){
                            $scope.shop = cache.get('shop'  + city ) ;
                        }
                        else{
                            area.shop( city ).success(function( res ) {
                                if( res.code == 0 ){
                                    $scope.shop  = res.data ;
                                    cache.set('shop'  + city , res.data )
                                    $scope.$emit('shopLoaded')
                                }
                                else{
                                    angular.message( res.msg );
                                }
                            }).error(function(){
                                //angular.message("无法访问核");
                            })
                        }
                    }
                    else{
                        $scope.shop  = [];
                        new Function('$scope','return $scope.' + $shop.attr('ng-model') + '= null ' )($scope);
                    }
                })

                $scope.$watch( $shop.attr('ng-model'), function( val ){
                    var shop = val;
                    if(shop){
                        area.getUser( shop ).success(function( res ) {
                                if( res.code == 0 ){
                                    $scope.user  = res.data ;
                                    $scope.$emit('userLoaded')
                                }
                                else{
                                    angular.message( res.msg );
                                }
                            }).error(function(){
                                //angular.message("无法访问核");
                            })

                    }
                    else{
                        $scope.user  = [];
                        new Function('$scope','return $scope.' + $user.attr('ng-model') + '= null ' )($scope);
                    }
                })

            }
        };
    }])