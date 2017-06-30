angular.module('change.businfo.index.directive',[])
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




//                elem.bind('click', function() {
//                    elem.css('background-color', 'white');
//                    scope.$apply(function() {
//                        scope.color = "white";
//                    });
//                });
//                elem.bind('mouseover', function() {
//                    elem.css('cursor', 'pointer');
//                });
            }
        }
    }).directive('xx', function(){
        return {
            restrict: 'ECMA',
            replace: true,
            template: 'fuck',
            cope:{
//                provincecity:'='
            },
            link: function(scope, elem, attrs) {




//                elem.bind('click', function() {
//                    elem.css('background-color', 'white');
//                    scope.$apply(function() {
//                        scope.color = "white";
//                    });
//                });
//                elem.bind('mouseover', function() {
//                    elem.css('cursor', 'pointer');
//                });
            }
        }
    });

