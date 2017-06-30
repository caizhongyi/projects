angular.module('user.dept.index.directive',['user.dept.index.service'])

    .directive("selectLocation" , [ "area", "$timeout", "depts", function( area, $timeout , depts){
        return {
            require: '?ngModel',
            link: function( $scope, elm, attrs, ctrl ) {
                area.province().success(function( res ) {
                    if( res.code == 0 ){
                        $scope.province = res.data ;
                        $timeout(function(){$province.trigger('change')});
                    }
                    else{
                        utils.message( res.msg );
                    }
                }).error(function(){
                    //utils.message("无法访问！");
                });

                var $province = elm.find('.province');
                var $city = elm.find('.city');
                var $dept = elm.find('.dept');
                var pro = '';
                $province.on('change',function(){
                    pro = new Function('$scope','return $scope.' + $province.attr('ng-model') )($scope);
                    if(pro)
                        area.city( pro.id ).success(function( res ) {
                            if( res.code == 0 ){
                                $scope.city  = res.data ;
                                $scope.shop = [];
                                $timeout(function(){$city.trigger('change')});
                            }
                            else{
                                utils.message( res.msg );
                            }
                        }).error(function(){
                            //utils.message("无法访问！");
                        });
                    else{
                        $scope.city = $scope.shop  = [];
                        new Function('$scope','return $scope.' + $city.attr('ng-model') + '= null ' )($scope);
                        new Function('$scope','return $scope.' + $dept.attr('ng-model') + '= null ')($scope);
                        $scope.$apply();
                    }
                });

                $city.on('change',function(){
                    var city = new Function('$scope','return $scope.' + $city.attr('ng-model') )($scope);

                    if(city)
                        depts.getDeptLevels( pro.id , city.id).success(function( res ) {
                            if( res.code == 0 ){
                                $scope.deptLevels  = res.data ;
                            }
                            else{
                                utils.message( res.msg );
                            }
                        }).error(function(){
                            //utils.message("无法访问！");
                        });
                    else{
                        $scope.shop  = [];
                        new Function('$scope','return $scope.' + $dept.attr('ng-model') + '= null ' )($scope);
                        $scope.$apply();
                    }
                });


            }
        };
    }]);

