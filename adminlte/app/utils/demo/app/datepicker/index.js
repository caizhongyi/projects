/**
 * Created by DTO on 2015/4/27.
 */
var appUser = angular.module('mbs.index.home', []);
appUser.controller('controller.mbs.index.home',function( $scope ){
    //Make the dashboard widgets sortable Using jquery UI
    $scope.name = "my"
    $scope.str = "mystrs"
    $scope.fn = function(){ alert( 1)}
})
    .directive('sortable', function ($timeout) {
         return {
             restrict: 'A',
             scope : {
             },
             link: function(scope, element, attrs) {
                  var defaults = {
                      placeholder: "sort-highlight",
                      connectWith: ".connectedSortable",
                      handle: ".box-header, .nav-tabs",
                      forcePlaceholderSize: true,
                      zIndex: 999999
                  }
                // if (scope.$last === true) {
                    $timeout(function() {
                        //scope.$emit('ngPaginationFinished');
                        element.sortable( angular.extend( defaults , attrs ) );
                    });
                //}
            }
        }
    })