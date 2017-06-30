/*var controller = require('app/user/controller.js');*/

var appUser = angular.module('app.user', [
    'app.user.service',
    'ui.router'
]).config(
    [  '$stateProvider', '$urlRouterProvider',
        function ($stateProvider,   $urlRouterProvider) {

        }
    ]
).directive('myTable', function( $document ) {
        // 可以为对象，也可以为方法
        return function( $scope , element ){
        
            $scope.$watch($scope, function(){
                element.dataTable();
            })
        }
}).controller('controller.user', ['$scope','$stateParams', '$state', 'service.user' , function( $scope,   $stateParams,   $state , service  ){
        service.all().then(function( data ){
            $scope.service = data;
        })
 }])
