angular.module('change.user.index.directive',[])
    .directive('provinceCity', function( $http ){
        return {
            restrict: 'ECMA',
            replace: true,
            template: '<div class="form-group">'+
            '<label for="update-xx"  class="col-sm-2 control-label"></label>'+
            '<div class="col-sm-10"> ' +
            '省份<select id="update-xx" name="pro" class="" ng-model="item.sex"></select>'+
            '城市<select id="update-xxx" name="sex" class="" ng-model="item.sex">'+
            '</select></div></div>',
            cope:{
//                provincecity:'='
            },
            link: function(scope, elem, attrs) {
            }
        }
    }) .directive("direct",function($http , MBS_DOMAIN){
        return {
            restrict: 'ECMA',
            replace: true,
            template:
            '<div id="liandong">' +
            '省份<select id="province" name="pro" class="" ng-model="item.province">' +
            '<option ng-repeat="province in provinces" ng-selected="item.province == province.id" value="{{province.id}}">{{province.name}}</option>' +
            '</select>'+
            '城市<select id="update-xxx" name="sex" class="city" ng-model="item.city">' +
            '<option ng-repeat="city in citys"  ng-selected="item.city == city.id" value="{{city.id}}">{{city.name}}</option>'+
            '</select></div>',
            cope:{
                provincecity:'='
            },
            link: function(scope, elem, attrs) {
                $http.get(MBS_DOMAIN + '/User/Common/getProvinceList/token/1').success(function(result) {
                    if (result.code == 0) {
                        scope.provinces = result.data;
                    }
                });
                scope.$watch('item.province', function(id,oldValue, scope){
                    if (id) {
                        $http.get(MBS_DOMAIN + '/User/Common/getCityListByProvinceId/token/1/id/' + id).success(function(result) {
                            if (result.code == 0) {
                                scope.citys = result.data;
                            }
                        });
                    }
                })
            }
        }
    });

